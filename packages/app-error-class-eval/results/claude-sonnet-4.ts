interface AppErrorType {
  code: string;
}

type Class<T> = new (...args: any[]) => T;

/** Creates an error class with the specified error code */
function AppError<T extends string>(code: T) {
  class ErrorImpl implements AppErrorType {
    readonly code = code;
    
    constructor(public message?: string) {}
  }
  
  return Object.assign(ErrorImpl, { code });
}

/** Checks if an error object matches the specified error class */
function matchErrorClass<E extends Class<AppErrorType> & { code: string }>(
  error: object, 
  ErrorClass: E
): error is { code: E["code"] } {
  return 'code' in error && (error as { code: unknown }).code === ErrorClass.code;
}
