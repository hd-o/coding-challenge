/**
 * Represents the base interface for custom application errors.
 * Instances of classes created by `AppError` will conform to this type.
 */
interface AppErrorType extends Error {
  code: string;
}

/**
 * Represents the constructor type for an application error class.
 * This includes the `new` signature and static properties like `code`.
 */
interface AppErrorClassConstructor<T extends AppErrorType> {
  new (message?: string, options?: ErrorOptions): T;
  readonly code: string;
  readonly name: string;
}

/**
 * Creates a custom error class with a specific code.
 *
 * @param code The unique error code for this class.
 * @returns A constructor for a new `AppError` class.
 */
function AppError(code: string): AppErrorClassConstructor<AppErrorType> {
  class DynamicAppError extends Error implements AppErrorType {
    readonly code: string;

    constructor(message?: string, options?: ErrorOptions) {
      super(message, options);
      // Ensure the correct prototype chain for `instanceof` checks
      Object.setPrototypeOf(this, DynamicAppError.prototype);
      // Set the instance's error name to the class name
      this.name = this.constructor.name;
      // Assign the static code value to the instance
      this.code = DynamicAppError.code;
    }

    // Static property to hold the unique error code
    static readonly code: string = code;
  }

  return DynamicAppError;
}

/**
 * Example error class extending from `AppError`.
 */
class AuthTokenError extends AppError("AUTH_TOKEN") {}

/**
 * Type guard to check if a given error object from a network response
 * matches a specific `AppError` class by comparing their `code` properties.
 *
 * @param error The error object received (e.g., from a network response body).
 * @param ErrorClass The `AppError` class constructor to match against.
 * @returns `true` if the error object's `code` property matches the `ErrorClass`'s static `code`, `false` otherwise.
 */
function matchErrorClass<E extends AppErrorClassConstructor<AppErrorType>>(
  error: object,
  ErrorClass: E,
): error is { code: E["code"] } {
  // Check if the error object has a 'code' property and if it's a string
  if (
    'code' in error &&
    typeof (error as { code: unknown }).code === 'string'
  ) {
    const errorCode = (error as { code: string }).code;
    // Compare the error object's code with the static code of the provided ErrorClass
    return errorCode === ErrorClass.code;
  }
  return false;
}
