interface AppErrorType {
  code: string;
}

type Class<T> = abstract new (...args: any[]) => T;

/**
 * Creates a base error class with the specified code.
 */
function AppError(code: string): Class<AppErrorType> {
  class ErrorClass implements AppErrorType {
    public readonly code = code;
  }
  return ErrorClass;
}

/**
 * Matches if the error is an instance of the given error class.
 */
function matchErrorClass<E extends Class<AppErrorType>>(
  error: object,
  ErrorClass: E,
): error is InstanceType<E> {
  return error instanceof ErrorClass;
}
