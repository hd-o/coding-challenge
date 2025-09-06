/**
 * Base app error type with required code property
 */
interface AppErrorType {
  code: string;
}

/**
 * Creates an error class with a fixed code
 */
function AppError(code: string): new (...args: any[]) => AppErrorType & { code: typeof code } {
  return class extends Error {
    public readonly code = code;
    constructor(message?: string) {
      super(message);
      Object.setPrototypeOf(this, new.target.prototype);
    }
  };
}

/**
 * Type guard to match error object against error class by code
 */
function matchErrorClass<E extends { code: string }>(
  error: object,
  ErrorClass: { code: E['code'] }
): error is { code: E['code'] } {
  return (error as { code?: unknown }).code === ErrorClass.code;
}

// Example error class
class AuthTokenError extends AppError("AUTH_TOKEN") {}
