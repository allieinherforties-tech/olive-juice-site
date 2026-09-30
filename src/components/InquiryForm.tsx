"use client";

import { useId, useState, type FormEvent } from "react";
import { INQUIRY_ENDPOINT, SITE } from "@/content/site";

type FieldName = "name" | "organization" | "email" | "whatWeDo" | "weekBack" | "tools";
type FieldErrors = Partial<Record<FieldName, string>>;

type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string; fields: FieldErrors };

type Field = {
  name: FieldName;
  label: string;
  type: "text" | "email" | "textarea";
  required: boolean;
  autoComplete?: string;
  hint?: string;
};

// Mirrors the prompts from the old pre-filled inquiry email. Short inputs come first so
// they pair up in the two-column CTA-band layout.
const FIELDS: readonly Field[] = [
  { name: "name", label: "Your name", type: "text", required: true, autoComplete: "name" },
  { name: "organization", label: "Organization", type: "text", required: true, autoComplete: "organization" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "tools", label: "Tools we already use", type: "text", required: false, hint: "e.g. Google Sheets, Airtable, Slack" },
  { name: "whatWeDo", label: "What we do", type: "textarea", required: false },
  {
    name: "weekBack",
    label: "The part of our week I'd most like to get back",
    type: "textarea",
    required: true,
  },
];

const GENERIC_ERROR = `Something went wrong sending your note. Please try again, or email ${SITE.email}.`;

/** Map the endpoint's JSON response to the next form state. */
function stateFromResponse(status: number, body: unknown): SubmitState {
  const payload = (typeof body === "object" && body !== null ? body : {}) as {
    ok?: boolean;
    error?: string;
    fields?: FieldErrors;
  };
  if (status >= 200 && status < 300 && payload.ok) return { kind: "success" };
  if (status === 422 && payload.fields) {
    return { kind: "error", message: "A few details are missing — see the highlighted fields.", fields: payload.fields };
  }
  return { kind: "error", message: payload.error && status !== 422 ? payload.error : GENERIC_ERROR, fields: {} };
}

function formPayload(form: HTMLFormElement): Record<string, string> {
  const data = new FormData(form);
  const payload: Record<string, string> = {};
  for (const [key, value] of data.entries()) if (typeof value === "string") payload[key] = value;
  return payload;
}

export function InquiryForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [state, setState] = useState<SubmitState>({ kind: "idle" });
  const idPrefix = useId();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ kind: "submitting" });
    try {
      const res = await fetch(INQUIRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formPayload(event.currentTarget)),
      });
      const body: unknown = await res.json().catch(() => null);
      setState(stateFromResponse(res.status, body));
    } catch {
      // Network failure or the endpoint is unreachable.
      setState({ kind: "error", message: GENERIC_ERROR, fields: {} });
    }
  }

  const className = `inquiry inquiry--${tone}`;

  if (state.kind === "success") {
    return (
      <div className={className} role="status" aria-live="polite">
        <div className="inquiry__success">
          <p className="inquiry__success-title">Thanks — your note is in.</p>
          <p>I&rsquo;ll reply by email so we can talk through whether it&rsquo;s a fit.</p>
        </div>
      </div>
    );
  }

  const fieldErrors = state.kind === "error" ? state.fields : {};
  const submitting = state.kind === "submitting";

  return (
    <form className={className} onSubmit={onSubmit} aria-busy={submitting}>
      <div className="inquiry__grid">
        {FIELDS.map((f) => {
          const id = `${idPrefix}-${f.name}`;
          const error = fieldErrors[f.name];
          const describedBy = [f.hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ");
          const common = {
            id,
            name: f.name,
            required: f.required,
            disabled: submitting,
            "aria-invalid": error ? true : undefined,
            "aria-describedby": describedBy || undefined,
          };
          return (
            <div key={f.name} className={`inquiry__field${f.type === "textarea" ? " inquiry__field--wide" : ""}`}>
              <label htmlFor={id}>
                {f.label}
                {!f.required && <span className="inquiry__optional"> (optional)</span>}
              </label>
              {f.type === "textarea" ? (
                <textarea {...common} rows={3} />
              ) : (
                <input {...common} type={f.type} autoComplete={f.autoComplete} />
              )}
              {f.hint && (
                <span id={`${id}-hint`} className="inquiry__hint">
                  {f.hint}
                </span>
              )}
              {error && (
                <span id={`${id}-error`} className="inquiry__error">
                  {error}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div className="inquiry__trap" aria-hidden="true">
        <label htmlFor={`${idPrefix}-website`}>Website</label>
        <input id={`${idPrefix}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.kind === "error" && (
        <p className="inquiry__alert" role="alert">
          {state.message}
        </p>
      )}

      <button type="submit" className="btn btn--primary" disabled={submitting}>
        {submitting ? "Sending…" : "Send my note"}
      </button>
    </form>
  );
}
