# 🥈 App Error Class Eval

`#ai` `#typescript` `#eval`

Comparison of AI models in generating App Error classes with TypeScript.

All models have reasoning enabled with medium effort, or are thinking variants.

## What's being measured?

This evaluation compares AI-generated implementations of a small TypeScript "AppError" factory and a frontend matcher. The goal is to measure how well each model balances strong typing, runtime correctness, and simplicity, measuring:

- **Type precision:** Whether the generated `AppError` preserves the error code as a string literal in types (e.g. `C extends string` / `code: C`) so `AuthTokenError` yields a narrowed `code` type
- **Type guard accuracy:** Whether `matchErrorClass` narrows an unknown/network error to the precise `{ code: E["code"] }` shape and includes safe runtime checks (object/null checks, `typeof code === 'string'`)
- **Runtime behavior:** Correct `Error` semantics and consistent static vs instance `code` values at runtime
- **Simplicity & safety:** Minimal and clear implementations (KISS), avoiding unsafe casts like `as any`
- **Interoperability:** How well the matcher works with plain response bodies (not only `instanceof` Error) and whether implementations handle missing or non-string `code` fields gracefully

## Prompt

```md
Create TypeScript code implementing the following feature:

<feature>
- Function to create classes in backend `AppError: (code: string) => Class<AppErrorType>`.
- Example error class `class AuthTokenError extends AppError("AUTH_TOKEN") {}`.
- Function for frontend matching of network response error body `matchErrorClass: <E extends Class<AppErrorType>>(error: object, ErrorClass: E): error is { code: E["code"] }`.
</feature>

<rules>
- Reply with only the code implementation!
- Reply with the code inside a markdown typescript code block!
- Feel free to modify the types from above if necessary!
- Do not add examples beyond the AuthTokenError!
- If adding comments, only add brief, short jsdoc comments above each function!
- Do not use `as any` type casting!
- All functions MUST have a return type!
- Focus on simplicity (KISS), and strong typing (few type casts)!
</rules>
```
