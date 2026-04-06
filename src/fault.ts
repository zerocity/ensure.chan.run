import { defineError } from "./define-error";
import type { FaultErrorClass } from "./types";

// Cache for inline string codes. Keyed by the code string, so each unique
// code creates exactly one error class. Use only with static string codes —
// dynamic codes (e.g. template literals with IDs) will leak memory.
const inlineCache = new Map<string, FaultErrorClass>();

/**
 * Throw a typed error — from a class or an inline string code.
 *
 * ```ts
 * fault(NotFoundError, "User not found");
 * fault("RATE_LIMITED", "Too many requests");
 * ```
 *
 * @example Backend — validation layer
 * ```ts
 * import { fault, defineError } from "@chan.run/ensure";
 *
 * const ValidationError = defineError("ValidationError");
 *
 * function validateAge(age: number) {
 *   if (age < 0 || age > 150) {
 *     fault(ValidationError, `Invalid age: ${age}`);
 *   }
 * }
 * ```
 *
 * @example Backend — rethrow third-party errors with cause
 * ```ts
 * try {
 *   await stripe.charges.create(params);
 * } catch (err) {
 *   fault(PaymentFailedError, "Charge failed", { cause: err });
 * }
 * ```
 *
 * @example Inline string code for quick prototyping
 * ```ts
 * // No need to defineError — just use a string code.
 * // Same string always reuses the same error class internally.
 * fault("TODO", "Not implemented yet");
 * fault("UNAUTHORIZED", "You must be logged in");
 * ```
 *
 * @example Frontend — guard impossible states
 * ```ts
 * function getStatusColor(status: "ok" | "warn" | "error"): string {
 *   switch (status) {
 *     case "ok": return "green";
 *     case "warn": return "yellow";
 *     case "error": return "red";
 *     default: fault("UNREACHABLE", `Unknown status: ${status}`);
 *   }
 * }
 * ```
 *
 * @example Backend — authorization check
 * ```ts
 * function requireAdmin(user: User) {
 *   if (user.role !== "admin") {
 *     fault(ForbiddenError, `User ${user.id} is not an admin`);
 *   }
 * }
 * ```
 */
export function fault(
  target: FaultErrorClass | string,
  message: string,
  options?: { cause?: unknown },
): never {
  let ErrorClass: FaultErrorClass;

  if (typeof target === "string") {
    let cached = inlineCache.get(target);
    if (!cached) {
      cached = defineError(target);
      inlineCache.set(target, cached);
    }
    ErrorClass = cached;
  } else {
    ErrorClass = target;
  }

  throw new ErrorClass(message, options);
}
