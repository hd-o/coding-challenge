type Class<T> = new (...args: unknown[]) => T;

/**
 * App error instance shape with a literal `code`.
 */
type AppErrorInstance<C extends string> = Error & { readonly code: C };

/**
 * App error class type carrying a static `code` literal and producing instances with that `code`.
 */
type AppErrorClass<C extends string> = {
  new (message?: string): AppErrorInstance<C>;
  readonly code: C;
  readonly prototype: AppErrorInstance<C>;
};

/**
 * Create a custom AppError class with a literal `code`.
 */
function AppError<C extends string>(code: C): AppErrorClass<C> {
  const Generated = class extends Error {
    static readonly code = code as C;
    readonly code = code as C;

    constructor(message?: string) {
      super(message ?? code);
      Object.setPrototypeOf(this, new.target.prototype);
    }
  };
  return Generated as unknown as AppErrorClass<C>;
}

/**
 * Narrow an unknown error object by matching its `code` to the provided error class's `code`.
 */
function matchErrorClass<C extends string>(error: unknown, ErrorClass: AppErrorClass<C>): error is { code: C } {
  if (typeof error !== "object" || error === null) return false;
  const e = error as Record<string, unknown>;
  return e.code === ErrorClass.code;
}

/* Example error class */
class AuthTokenError extends AppError("AUTH_TOKEN") {}
