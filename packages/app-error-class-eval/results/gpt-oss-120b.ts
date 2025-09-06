/** Base type for all application errors */
export interface AppErrorType {
  /** Unique error identifier */
  readonly code: string;
}

/** Constructor type for an AppError class */
export type AppErrorClass = new (...args: unknown[]) => AppErrorType & {
  /** Static error identifier */
  readonly code: string;
};

/**
 * Factory that creates a new error class bound to a specific error code.
 *
 * @param code - The unique error code.
 * @returns A class extending `AppErrorType` with the given code.
 */
export function AppError(code: string): AppErrorClass {
  return class extends (class {
    /** Instance error code */
    readonly code = code;
  }) {
    /** Static error code */
    static readonly code = code;
  };
}

/** Example backend error class */
export class AuthTokenError extends AppError("AUTH_TOKEN") {}

/**
 * Checks whether a network response error object matches a specific AppError class.
 *
 * @param error - The error object received from the backend.
 * @param ErrorClass - The AppError class to match against.
 * @returns `true` if `error` has a `code` equal to `ErrorClass.code`.
 */
export function matchErrorClass<E extends AppErrorClass>(
  error: unknown,
  ErrorClass: E
): error is { code: typeof ErrorClass["code"] } {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error
  ) {
    const { code } = error as { code?: unknown };
    return code === ErrorClass.code;
  }
  return false;
}
