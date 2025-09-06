interface AppErrorType extends Error {
  code: string;
}

type Class<T> = new (...args: any[]) => T;

/**
 * Creates a custom error class with the given code.
 */
function AppError<C extends string>(code: C): Class<AppErrorType & { code: C }> & { code: C } {
  class AppErrorImpl extends Error {
    static readonly code = code;

    public code: C = code;

    constructor(message?: string) {
      super(message);
      this.name = 'AppError';
    }
  }

  return AppErrorImpl;
}

/**
 * Type guard to match if the error object has the specific error class code.
 */
function matchErrorClass<E extends Class<AppErrorType> & { code: string }>(error: object, ErrorClass: E): error is { code: E['code'] } {
  if (!('code' in error)) {
    return false;
  }
  const code = Reflect.get(error, 'code');
  return typeof code === 'string' && code === ErrorClass.code;
}

class AuthTokenError extends AppError("AUTH_TOKEN") {}
