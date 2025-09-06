/* Types */
export type AppErrorInstance<C extends string = string> = Error & {
  readonly code: C;
};

export type AppErrorType<C extends string = string> = AppErrorInstance<C>;

export type Class<I, S = {}> = { new (...args: any[]): I } & S;

/** Create a typed AppError class with a fixed code */
export function AppError<C extends string>(code: C): Class<AppErrorInstance<C>, { readonly code: C }> {
  class GeneratedAppError extends Error implements AppErrorInstance<C> {
    static readonly code: C = code;
    readonly code: C = code;

    constructor(message?: string) {
      super(message ?? code);
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  return GeneratedAppError;
}

/** Match a network error object to a specific AppError class by code */
export function matchErrorClass<E extends Class<AppErrorInstance<string>, { readonly code: string }>>(
  error: unknown,
  ErrorClass: E
): error is { code: E["code"] } {
  if (typeof error !== "object" || error === null) return false;
  const maybe = error as { code?: unknown };
  return typeof maybe.code === "string" && maybe.code === ErrorClass.code;
}

/* Example error class */
export class AuthTokenError extends AppError("AUTH_TOKEN") {}
