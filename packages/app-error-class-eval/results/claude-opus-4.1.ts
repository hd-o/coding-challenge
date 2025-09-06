interface AppErrorType {
  code: string;
  message?: string;
}

type Class<T> = new (...args: any[]) => T;

/** Creates an error class with a specific error code */
function AppError<Code extends string>(code: Code): Class<AppErrorType> & { code: Code } {
  class AppErrorImpl extends Error implements AppErrorType {
    static code = code;
    code = code;
    
    constructor(message?: string) {
      super(message);
      this.name = this.constructor.name;
    }
  }
  
  return AppErrorImpl as Class<AppErrorType> & { code: Code };
}

class AuthTokenError extends AppError("AUTH_TOKEN") {}

/** Checks if an error object matches a specific error class */
function matchErrorClass<E extends Class<AppErrorType> & { code: string }>(
  error: object,
  ErrorClass: E
): error is { code: E["code"] } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === ErrorClass.code
  );
}
