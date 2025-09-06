/**
 * Base class for application errors.
 */
abstract class BaseAppError {
  constructor(public readonly code: string) {}
}

type AppErrorType = BaseAppError;

interface AppErrorConstructor {
  new(): AppErrorType;
  readonly code: string;
}

/**
 * Factory function to create an AppError subclass with a fixed code.
 * @param code - The error code for the subclass.
 * @returns The constructor for the error class.
 */
function AppError(code: string): AppErrorConstructor {
  return class extends BaseAppError {
    static readonly code = code;
    constructor() {
      super(code);
    }
  };
}

// Example error class
class AuthTokenError extends AppError("AUTH_TOKEN") {}

/**
 * Type guard to match an error object against an AppError class by code.
 * @param error - The error object to check.
 * @param ErrorClass - The AppError class to match against.
 * @returns True if the error code matches the class code.
 */
function matchErrorClass<E extends AppErrorConstructor>(
  error: { code?: unknown },
  ErrorClass: E
): error is { code: E["code"] } {
  return error.code === ErrorClass.code;
}
