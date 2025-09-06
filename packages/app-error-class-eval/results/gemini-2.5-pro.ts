/**
 * The base type for an application error instance.
 */
interface AppErrorType extends Error {
  readonly code: string;
}

/**
 * The type for an application error class created by the AppError factory.
 * It has a static readonly `code` and constructs AppErrorType instances.
 */
type AppErrorClass<C extends string = string> = {
  new (message?: string): AppErrorType & { readonly code: C };
  readonly code: C;
};

/**
 * A factory function to create custom AppError classes.
 * @param code The unique error code for this class.
 */
function AppError<C extends string>(code: C): AppErrorClass<C> {
  class CustomError extends Error implements AppErrorType {
    public static readonly code: C = code;
    public readonly code: C = code;

    constructor(message?: string) {
      super(message);
      this.name = new.target.name;
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  return CustomError;
}

/**
 * Example error class for authentication token issues.
 */
class AuthTokenError extends AppError("AUTH_TOKEN") {}

/**
 * A type guard to check if a caught error object matches a specific AppError class.
 * @param error The error object, typically from a network response body.
 * @param ErrorClass The AppError class to match against.
 */
function matchErrorClass<E extends AppErrorClass>(
  error: unknown,
  ErrorClass: E
): error is { readonly code: E["code"] } & object {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: unknown }).code === ErrorClass.code
  );
}
