import type { FaultError, NamedFaultErrorClass } from "./types";

/** Any class that extends Error and can be subclassed. */
type ErrorBaseClass = abstract new (
  message?: string,
  options?: { cause?: unknown },
) => Error;

export interface DefineErrorOptions {
  /** Custom code. Defaults to name. */
  code?: string;
  /** Base class to extend. Defaults to Error. */
  base?: ErrorBaseClass;
}

// V8 engines expose captureStackTrace on the Error constructor.
// Declared here so we can reference it without `any`.
interface ErrorWithCaptureStackTrace {
  captureStackTrace(
    target: object,
    // biome-ignore lint/complexity/noBannedTypes: V8's captureStackTrace accepts any callable
    ctor?: Function,
  ): void;
}

/**
 * Define a reusable typed error class.
 *
 * ```ts
 * const NotFoundError = defineError("NotFoundError");
 * const ValidationError = defineError("ValidationError", { code: "VALIDATION" });
 * ```
 *
 * @example Domain error catalog — one file, import everywhere
 * ```ts
 * // errors/auth.ts
 * export const UnauthorizedError = defineError("UnauthorizedError");
 * export const TokenExpiredError = defineError("TokenExpiredError");
 * export const ForbiddenError = defineError("ForbiddenError");
 *
 * // errors/billing.ts
 * export const PaymentFailedError = defineError("PaymentFailedError");
 * export const QuotaExceededError = defineError("QuotaExceededError");
 * ```
 *
 * @example Custom error code for API responses
 * ```ts
 * const RateLimitError = defineError("RateLimitError", { code: "RATE_LIMITED" });
 *
 * // In an API handler:
 * // err.name  → "RateLimitError"  (for matching)
 * // err.code  → "RATE_LIMITED"    (for API response payloads)
 * ```
 *
 * @example Extending a base class
 * ```ts
 * class HttpError extends Error {
 *   status = 500;
 * }
 *
 * const NotFoundError = defineError("NotFoundError", { base: HttpError });
 * const err = new NotFoundError("gone");
 * err instanceof HttpError; // true
 * err.status;               // 500
 * ```
 *
 * @example Frontend — form validation errors
 * ```ts
 * const InvalidEmailError = defineError("InvalidEmailError", { code: "INVALID_EMAIL" });
 * const RequiredFieldError = defineError("RequiredFieldError", { code: "REQUIRED" });
 *
 * function validateEmail(value: string) {
 *   if (!value) fault(RequiredFieldError, "Email is required");
 *   if (!value.includes("@")) fault(InvalidEmailError, "Not a valid email");
 * }
 * ```
 *
 * @example Errors are proper Error instances
 * ```ts
 * const DbError = defineError("DbError");
 * const err = new DbError("connection lost");
 *
 * err instanceof Error;   // true
 * err instanceof DbError;  // true
 * err.name;                // "DbError"
 * err.message;             // "connection lost"
 * err.isFault;             // true
 * err.stack;               // full stack trace
 * ```
 */
export function defineError<N extends string>(
  name: N,
  options?: DefineErrorOptions,
): NamedFaultErrorClass<N> {
  const code = options?.code ?? name;
  const Base = options?.base ?? Error;

  const ErrorClass = class extends Base implements FaultError {
    readonly code = code;
    readonly isFault = true as const;

    constructor(message?: string, opts?: { cause?: unknown }) {
      super(message, opts);
      // Ensure instanceof works correctly even when transpiled to ES5
      Object.setPrototypeOf(this, new.target.prototype);
      this.name = name;
      if ("captureStackTrace" in Error) {
        (Error as unknown as ErrorWithCaptureStackTrace).captureStackTrace(
          this,
          ErrorClass,
        );
      }
    }
  };

  Object.defineProperty(ErrorClass, "name", { value: name });

  return ErrorClass as unknown as NamedFaultErrorClass<N>;
}
