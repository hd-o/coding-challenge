type AppErrorType<Code extends string> = {
  code: Code;
  message: string;
};

type AppErrorClass<Code extends string> = {
  new (message?: string): AppErrorType<Code>;
  code: Code;
};

/**
 * Creates an error class with a specific error code
 */
function AppError<Code extends string>(code: Code): AppErrorClass<Code> {
  return class AppErrorClass extends Error {
    static code = code;
    public code: Code;

    constructor(message: string = '') {
      super(message);
      this.code = code;
      this.name = this.constructor.name;
    }
  };
}

/**
 * Checks if an error object matches a specific error class
 */
function matchErrorClass<Code extends string>(
  error: object,
  ErrorClass: AppErrorClass<Code>
): error is AppErrorType<Code> {
  return 'code' in error && (error as { code: string }).code === ErrorClass.code;
}
