import type {
  FaultError,
  MatchHandlers,
  NamedFaultErrorClass,
  TypedMatchHandlers,
} from "./types";

/**
 * Handle an error by matching against a handler map keyed by name or code.
 * Fault errors are matched by name, then by code.
 * Native errors (TypeError, AbortError, SyntaxError, etc.) are matched by name.
 * Plain `Error` (name === "Error") always falls through to `_` to avoid catching everything.
 *
 * When the error type is known (from declares + tryAsync), handlers are
 * exhaustiveness-checked — TypeScript will error if you miss one:
 *
 * ```ts
 * const result = await tryAsync(getUser, id);
 * if (!result.ok) {
 *   // TypeScript requires handlers for NotFoundError AND DbError
 *   match(result.error, [NotFoundError, DbError], {
 *     NotFoundError: (err) => respond(404, err.message),
 *     DbError: (err) => respond(503, "DB unavailable"),
 *   });
 * }
 * ```
 *
 * For untyped errors, use the two-arg form with string keys + fallback:
 *
 * ```ts
 * match(error, {
 *   ValidationError: (err) => respond(400, err.message),
 *   _: (err) => { throw err },
 * });
 * ```
 *
 * @example Backend — Express error middleware
 * ```ts
 * app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
 *   match(err, {
 *     ValidationError: (e) => res.status(400).json({ error: e.message }),
 *     UnauthorizedError: (e) => res.status(401).json({ error: "Unauthorized" }),
 *     NotFoundError: (e) => res.status(404).json({ error: e.message }),
 *     _: (e) => {
 *       console.error("Unhandled error", e);
 *       res.status(500).json({ error: "Internal server error" });
 *     },
 *   });
 * });
 * ```
 *
 * @example Backend — exhaustive match with typed errors
 * ```ts
 * const result = await tryAsync(createOrder, userId, items);
 * if (!result.ok) {
 *   return match(result.error, [OutOfStockError, PaymentFailedError, DbError], {
 *     OutOfStockError: (e) => Response.json({ error: e.message }, { status: 409 }),
 *     PaymentFailedError: (e) => Response.json({ error: "Payment failed" }, { status: 402 }),
 *     DbError: () => Response.json({ error: "Try again later" }, { status: 503 }),
 *   });
 * }
 * ```
 *
 * @example Frontend — map errors to toast notifications
 * ```tsx
 * async function handleSubmit(data: FormData) {
 *   const result = await tryAsync(submitForm, data);
 *   if (!result.ok) {
 *     match(result.error, {
 *       ValidationError: (e) => toast.warning(e.message),
 *       NetworkError: () => toast.error("Check your connection"),
 *       _: () => toast.error("Something went wrong"),
 *     });
 *   }
 * }
 * ```
 *
 * @example Matching native errors (TypeError, AbortError, etc.)
 * ```ts
 * const result = await tryAsync(() => fetch(url, { signal }));
 * if (!result.ok) {
 *   match(result.error, {
 *     AbortError: () => console.log("Request cancelled"),
 *     TypeError: (e) => console.error("Network failure:", e.message),
 *     _: (e) => { throw e },
 *   });
 * }
 * ```
 *
 * @example Logging and telemetry dispatch
 * ```ts
 * function reportError(error: unknown) {
 *   match(error, {
 *     ValidationError: (e) => metrics.increment("validation_error"),
 *     DbError: (e) => {
 *       logger.error("Database error", { message: e.message, code: e.code });
 *       alertOncall("db-failure");
 *     },
 *     _: (e) => logger.warn("Unknown error", { error: e }),
 *   });
 * }
 * ```
 */
export function match<T>(error: unknown, handlers: MatchHandlers<T>): T;
export function match<
  TErrors extends NamedFaultErrorClass<string>[],
  THandlers extends TypedMatchHandlers<unknown, TErrors>,
>(
  error: unknown,
  errorClasses: readonly [...TErrors],
  handlers: THandlers,
): ReturnType<Extract<THandlers[keyof THandlers], (...args: never) => unknown>>;
export function match<T>(
  error: unknown,
  handlersOrClasses: MatchHandlers<T> | readonly NamedFaultErrorClass<string>[],
  typedHandlers?: Record<string, (error: FaultError) => T>,
): T {
  // Resolve overload: 3-arg (typed) vs 2-arg (untyped)
  const handlers: MatchHandlers<T> = Array.isArray(handlersOrClasses)
    ? (typedHandlers as unknown as MatchHandlers<T>)
    : (handlersOrClasses as MatchHandlers<T>);

  if (error instanceof Error) {
    if (isFaultError(error)) {
      // Fault errors: match by name first, then by code
      const nameHandler = handlers[error.name];
      if (nameHandler) {
        return nameHandler(error);
      }

      const codeHandler = handlers[error.code];
      if (codeHandler) {
        return codeHandler(error);
      }
    } else if (error.name !== "Error") {
      // Native errors (TypeError, AbortError, etc.): match by name.
      // Skip plain "Error" to avoid catching everything.
      const nameHandler = handlers[error.name];
      if (nameHandler) {
        return nameHandler(error as FaultError);
      }
    }
  }

  // Fallback handler
  if (handlers._) {
    return handlers._(error);
  }

  // No match and no fallback — re-throw
  throw error;
}

/** Type guard: checks isFault marker without casting to any. */
function isFaultError(error: Error): error is FaultError {
  return "isFault" in error && (error as { isFault: unknown }).isFault === true;
}
