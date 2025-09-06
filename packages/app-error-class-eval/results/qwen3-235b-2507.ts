/**
 * Creates a custom error class with a specific error code.
 */
function AppError<TCode extends string>(code: TCode): {
  new (message?: string): Error & { code: TCode };
} & { code: TCode } {
  class AppErrorBase extends Error {
    public static code = code;
    public code: TCode = code;
    constructor(message?: string) {
      super(message);
      this.name = 'AppError';
    }
  }
  return AppErrorBase;
}

/**
 * Type guard that checks if an error object matches an error class by code.
 */
function matchErrorClass<TCode extends string>(error: object, errorClass: { code: TCode }): error is { code: TCode } {
  if (!('code' in error)) return false;
  const candidate = error as { code: unknown };
  return typeof candidate.code === 'string' && candidate.code === errorClass.code;
}
