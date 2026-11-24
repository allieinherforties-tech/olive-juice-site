#!/usr/bin/env python3
"""Quiz submission endpoint for "Is This a Task for AI?".

Follows the same pattern as the site's inquiry endpoint: a small hosted service
on the project sandbox that accepts JSON POSTs from the static export, with a
honeypot field, field validation, and a notification email to Allie.

Endpoints:
  POST /quiz/submit   Store a submission (the review queue) and email the full
                      payload to NOTIFY_EMAIL. Subject carries the taker's name
                      and org. Never creates a Pipeline row; v1 sends the taker
                      nothing.
  POST /quiz/event    Count-only analytics (start | complete | form). No
                      personal information is accepted or stored.
  GET  /health        Health check for the hosting proxy.

Storage: SQLite at DATA_DIR/quiz.db. Every completed submission is stored
before the email is attempted; an email failure is logged and recorded
(email_sent=0) but never loses the submission.

Email: SMTP via environment variables, loaded from .env in the service
directory when present (SECRET_QUIZ_SMTP_HOST / SECRET_QUIZ_SMTP_PORT /
SECRET_QUIZ_SMTP_USER / SECRET_QUIZ_SMTP_PASS, written by the operator without
their values passing through chat). Without SMTP config the service still
stores submissions and logs the failure.
"""

import json
import logging
import os
import re
import smtplib
import sqlite3
from email.message import EmailMessage
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

PORT = int(os.environ.get("PORT", "8790"))
BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
DB_PATH = DATA_DIR / "quiz.db"

NOTIFY_EMAIL = os.environ.get("NOTIFY_EMAIL", "allie.esslinger@gmail.com")
NOTIFY_FROM = os.environ.get("NOTIFY_FROM", "quiz@olivejuice.digital")

ENERGIES = {"drains", "fine", "like"}
STAKES = {"low", "recoverable", "hurts"}
PACES = {"behind", "even", "ahead", "unclear"}
BOARDS = {"none", "light", "firm", "hard"}
MORALES = {"worry", "resistance", "curiosity", "excitement", "not-discussed"}
EVENTS = {"start", "complete", "form"}
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
    handlers=[logging.StreamHandler(), logging.FileHandler(BASE_DIR / "service.log")],
)
log = logging.getLogger("quiz-endpoint")


def load_env_file() -> None:
    """Pull SECRET_* values from .env into the environment, if the file exists."""
    env_path = BASE_DIR / ".env"
    if not env_path.exists():
        return
    for line in env_path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        os.environ.setdefault(key.strip(), value.strip())


def db() -> sqlite3.Connection:
    DATA_DIR.mkdir(exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with db() as conn:
        conn.execute(
            """CREATE TABLE IF NOT EXISTS submissions (
                   id INTEGER PRIMARY KEY AUTOINCREMENT,
                   submitted_at TEXT NOT NULL,
                   name TEXT NOT NULL,
                   org TEXT NOT NULL,
                   email TEXT NOT NULL,
                   payload_json TEXT NOT NULL,
                   email_sent INTEGER NOT NULL DEFAULT 0
               )"""
        )
        conn.execute(
            """CREATE TABLE IF NOT EXISTS events (
                   event TEXT PRIMARY KEY,
                   count INTEGER NOT NULL DEFAULT 0
               )"""
        )


def validate_submission(payload: dict) -> dict[str, str]:
    """Return a field->message map; empty means the payload is valid."""
    fields: dict[str, str] = {}
    if not str(payload.get("name", "")).strip():
        fields["name"] = "Name is required."
    if not str(payload.get("org", "")).strip():
        fields["org"] = "Organization is required."
    email = str(payload.get("email", "")).strip()
    if not email:
        fields["email"] = "Email is required."
    elif not EMAIL_RE.match(email):
        fields["email"] = "That email does not look right."

    tasks = payload.get("tasks")
    if not isinstance(tasks, list) or not 1 <= len(tasks) <= 6:
        fields["tasks"] = "Pick between one and six tasks."
    else:
        for i, task in enumerate(tasks):
            if not isinstance(task, dict) or not str(task.get("label", "")).strip():
                fields["tasks"] = f"Task {i + 1} is missing a label."
                break
            if task.get("energy") not in ENERGIES or task.get("stakes") not in STAKES:
                fields["tasks"] = f"Task {i + 1} has an incomplete rating."
                break

    context = payload.get("context")
    if not isinstance(context, dict) or context.get("pace") not in PACES:
        fields["context"] = "The pace answer is missing."
    elif context.get("board") not in BOARDS:
        fields["context"] = "The board-pressure answer is missing."
    elif context.get("morale") not in MORALES:
        fields["context"] = "The team-mood answer is missing."
    return fields


def send_notification(payload: dict) -> bool:
    """Email the full payload to Allie. Returns True on success."""
    host = os.environ.get("SECRET_QUIZ_SMTP_HOST")
    user = os.environ.get("SECRET_QUIZ_SMTP_USER")
    password = os.environ.get("SECRET_QUIZ_SMTP_PASS")
    port = int(os.environ.get("SECRET_QUIZ_SMTP_PORT", "587"))
    if not (host and user and password):
        log.error("SMTP not configured; submission stored without notification email")
        return False

    taker = payload.get("name", "")
    org = payload.get("org", "")
    message = EmailMessage()
    message["Subject"] = f"Quiz: {taker} · {org}"
    message["From"] = NOTIFY_FROM
    message["To"] = NOTIFY_EMAIL
    message.set_content(json.dumps(payload, indent=2, ensure_ascii=False))
    try:
        with smtplib.SMTP(host, port, timeout=20) as smtp:
            smtp.starttls()
            smtp.login(user, password)
            smtp.send_message(message)
        log.info("Notification email sent for %s (%s)", taker, org)
        return True
    except Exception:
        # The submission is already stored; surface the failure, never swallow it.
        log.exception("Notification email failed for %s (%s)", taker, org)
        return False


class Handler(BaseHTTPRequestHandler):
    server_version = "QuizEndpoint/1.0"

    def _cors(self) -> None:
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def _json(self, status: int, body: dict) -> None:
        data = json.dumps(body).encode()
        self.send_response(status)
        self._cors()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _read_json(self) -> dict | None:
        length = int(self.headers.get("Content-Length", "0") or "0")
        if length <= 0 or length > 64_000:
            return None
        try:
            parsed = json.loads(self.rfile.read(length))
        except (json.JSONDecodeError, UnicodeDecodeError):
            return None
        return parsed if isinstance(parsed, dict) else None

    def do_OPTIONS(self) -> None:  # noqa: N802 (http.server API)
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_GET(self) -> None:  # noqa: N802 (http.server API)
        if self.path == "/health":
            self._json(200, {"ok": True})
        else:
            self._json(404, {"ok": False, "error": "Not found."})

    def do_POST(self) -> None:  # noqa: N802 (http.server API)
        if self.path == "/quiz/submit":
            self._submit()
        elif self.path == "/quiz/event":
            self._event()
        else:
            self._json(404, {"ok": False, "error": "Not found."})

    def _submit(self) -> None:
        payload = self._read_json()
        if payload is None:
            self._json(400, {"ok": False, "error": "Send JSON."})
            return

        # Honeypot: pretend success and store nothing.
        if str(payload.get("website", "")).strip():
            log.info("Honeypot submission dropped")
            self._json(200, {"ok": True})
            return

        field_errors = validate_submission(payload)
        if field_errors:
            self._json(422, {"ok": False, "error": "A few details are missing.", "fields": field_errors})
            return

        email_sent = 1 if send_notification(payload) else 0
        with db() as conn:
            conn.execute(
                "INSERT INTO submissions (submitted_at, name, org, email, payload_json, email_sent) "
                "VALUES (?, ?, ?, ?, ?, ?)",
                (
                    str(payload.get("submittedAt", "")),
                    str(payload.get("name", "")).strip(),
                    str(payload.get("org", "")).strip(),
                    str(payload.get("email", "")).strip(),
                    json.dumps(payload, ensure_ascii=False),
                    email_sent,
                ),
            )
        log.info("Stored submission from %s (%s)", payload.get("name"), payload.get("org"))
        self._json(200, {"ok": True})

    def _event(self) -> None:
        payload = self._read_json()
        event = str(payload.get("event", "")) if payload else ""
        if event not in EVENTS:
            self._json(422, {"ok": False, "error": "Unknown event."})
            return
        with db() as conn:
            conn.execute(
                "INSERT INTO events (event, count) VALUES (?, 1) "
                "ON CONFLICT(event) DO UPDATE SET count = count + 1",
                (event,),
            )
        self._json(200, {"ok": True})

    def log_message(self, fmt: str, *args) -> None:  # route http.server logs to our logger
        log.info("%s - %s", self.address_string(), fmt % args)


if __name__ == "__main__":
    load_env_file()
    init_db()
    server = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    log.info("Quiz endpoint listening on port %d", PORT)
    server.serve_forever()
