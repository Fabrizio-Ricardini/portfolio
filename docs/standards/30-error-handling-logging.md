<!--
Template-ID: standards/30-error-handling-logging.md
Template-Version: 1
Source: .opencode/templates/standards/30-error-handling-logging.md
Copied-On: 2026-02-20
-->

# Error Handling & Logging

## Objective
Ensure consistent error taxonomy, mapping, and safe logging.

## Error Taxonomy
- **Validation/User errors:** bad input, missing fields
- **Business rule errors:** domain constraints, forbidden transitions
- **Infrastructure/IO errors:** DB down, timeouts, external API failures
- **Unexpected errors:** unhandled exceptions

## Handling Rules
- Never swallow errors silently.
- Wrap errors with context (what operation failed) without leaking secrets.
- Separate user-facing messages from internal logs.
- Ensure consistent mapping (error -> HTTP response or UI state).

## Logging Rules
- Use levels: debug/info/warn/error
- Prefer structured fields: request_id, correlation_id, user_id (if safe), operation, duration_ms
- Avoid logging PII/secrets.

## Security
- Do not log credentials, tokens, raw request bodies with secrets, or sensitive personal data.

## Testing Mapping
- Test error mapping behavior (e.g., validation error -> 400; business error -> 409/422).
- Test logging only when critical (avoid brittle assertions).
