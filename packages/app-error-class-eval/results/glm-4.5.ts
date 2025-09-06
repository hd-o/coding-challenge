type AppErrorType = {
  code: string;
  message?: string;
};

type Class<T> = new (...args: any[]) => T;

interface AppErrorConstructor<T extends AppErrorType> extends Class<T> {
  code: string;
}

/** Creates an error class with the given code. */
function AppError(code: string): AppErrorConstructor<AppErrorType> {
  return class implements AppErrorType {
    static readonly code = code;
    code = code;
    message?: string;

    constructor(message?: string) {
      this.message = message;
    }
  };
}

class AuthTokenError extends AppError("AUTH_TOKEN") {}

/** Matches an error to an error class, returning a type predicate. */
function matchErrorClass<E extends AppErrorConstructor<AppErrorType>>(error: object, ErrorClass: E): error is { code: E["code"] } {
  const errorObj = error as Record<string, unknown>;
  return Object.prototype.hasOwnProperty.call(errorObj, 'code') && typeof errorObj.code === 'string' && errorObj.code === ErrorClass.code;
}
