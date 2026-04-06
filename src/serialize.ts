import type { FaultError, FaultErrorClass } from "./types";

/** Serialized representation of a FaultError for JSON transport. */
export interface FaultErrorJSON {
  name: string;
  code: string;
  message: string;
  cause?: string;
}

/**
 * Serialize a FaultError to a plain object for JSON transport (API responses, logs).
 *
 * ```ts
 * const err = new NotFoundError("User not found");
 * const json = toJSON(err);
 * // { name: "NotFoundError", code: "NotFoundError", message: "User not found" }
 * ```
 *
 * @example API error response
 * ```ts
 * app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
 *   if (err instanceof Error && "isFault" in err) {
 *     res.status(400).json({ error: toJSON(err as FaultError) });
 *   } else {
 *     res.status(500).json({ error: "Internal server error" });
 *   }
 * });
 * ```
 *
 * @example Structured logging
 * ```ts
 * const result = await tryAsync(processPayment, orderId);
 * if (!result.ok && result.error instanceof Error && "isFault" in result.error) {
 *   logger.error("Payment failed", toJSON(result.error as FaultError));
 *   // { name: "PaymentFailedError", code: "PAYMENT_FAILED", message: "Card declined" }
 * }
 * ```
 *
 * @example Error forwarding across microservices
 * ```ts
 * // Service A — sends error over HTTP
 * const err = new ValidationError("Email already taken");
 * await fetch("https://service-b/webhook", {
 *   method: "POST",
 *   body: JSON.stringify({ event: "error", payload: toJSON(err) }),
 * });
 * ```
 */
export function toJSON(error: FaultError): FaultErrorJSON {
  const serialized: FaultErrorJSON = {
    name: error.name,
    code: error.code,
    message: error.message,
  };
  if (error.cause instanceof Error) {
    serialized.cause = error.cause.message;
  }
  return serialized;
}

/**
 * Deserialize a plain object back into a FaultError instance.
 * Requires a registry mapping names to error classes.
 *
 * ```ts
 * const registry = { NotFoundError, DbError };
 * const err = fromJSON(json, registry);
 * // err instanceof NotFoundError === true
 * ```
 *
 * Returns a generic Error if the name isn't in the registry.
 *
 * @example API client — deserialize server errors
 * ```ts
 * const registry = { ValidationError, NotFoundError, RateLimitError };
 *
 * async function apiCall(url: string) {
 *   const res = await fetch(url);
 *   if (!res.ok) {
 *     const body = await res.json();
 *     throw fromJSON(body.error, registry);
 *     // Throws a real NotFoundError instance, matchable with match()
 *   }
 *   return res.json();
 * }
 * ```
 *
 * @example Message queue consumer
 * ```ts
 * const registry = { PaymentFailedError, OrderError, DbError };
 *
 * queue.on("dead-letter", (msg) => {
 *   const error = fromJSON(msg.error, registry);
 *   match(error, {
 *     PaymentFailedError: (e) => retryPayment(msg.orderId),
 *     _: (e) => logger.error("Unrecoverable", { error: e }),
 *   });
 * });
 * ```
 *
 * @example Test assertions
 * ```ts
 * const json: FaultErrorJSON = {
 *   name: "NotFoundError",
 *   code: "NotFoundError",
 *   message: "User not found",
 * };
 * const err = fromJSON(json, { NotFoundError });
 *
 * expect(err).toBeInstanceOf(NotFoundError);
 * expect(err.message).toBe("User not found");
 * ```
 */
export function fromJSON(
  data: FaultErrorJSON,
  registry: Record<string, FaultErrorClass>,
): Error {
  const ErrorClass = registry[data.name];
  if (ErrorClass) {
    return new ErrorClass(data.message);
  }
  // Name not in registry — return plain Error
  const err = new Error(data.message);
  err.name = data.name;
  return err;
}
