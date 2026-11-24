# Quiz submission endpoint

Hosted service for "Is This a Task for AI?" (spec v2.0). Runs on the Obvious
project sandbox; the static site posts to it cross-origin.

- `POST /quiz/submit` — validates the payload, stores it in SQLite (`data/quiz.db`,
  the review queue), and emails the full payload to allie.esslinger@gmail.com with
  the taker's name and org in the subject line. It never creates a Pipeline row
  and never emails the taker (v1).
- `POST /quiz/event` — count-only analytics: `start`, `complete`, `form`. No
  personal information accepted.
- `GET /health` — hosting-proxy health check.

## Running

```sh
python3 services/quiz-endpoint/server.py   # PORT env var, default 8790
```

Stdlib only; no install step.

## SMTP

Notification email goes out over SMTP using four environment variables:
`SECRET_QUIZ_SMTP_HOST`, `SECRET_QUIZ_SMTP_PORT`, `SECRET_QUIZ_SMTP_USER`,
`SECRET_QUIZ_SMTP_PASS`. The deployed copy loads them from a `.env` file in the
service directory (operator-written, never passed through chat). Without SMTP
config the service still stores submissions and logs the failure; the queue in
SQLite remains the record.

## Deployment

The deployed copy lives at `/home/user/work/ojd-quiz-service/` on the project
sandbox, registered with `obvious hosted register` (port 8790, startup
`python3 /home/user/work/ojd-quiz-service/server.py`). Update the deployed copy
from this directory after changes, then restart the `svc-8790` tmux session.
