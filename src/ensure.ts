import { defineError } from "./define-error";
import type { FaultErrorClass } from "./types";

/**
 * Built-in error for string-form ensure calls.
 * Match on "EnsureError" to remap to a concrete typed error.
 */
export const EnsureError = defineError("EnsureError");

/**
 * Assert non-null/undefined. Returns the narrowed value or throws.
 *
 * Three forms:
 * ```ts
 * // Full — typed error class + message
 * const user = ensure(db.find(id), NotFoundError, `No user: ${id}`);
 *
 * // Class only — message defaults to error name
 * const user = ensure(db.find(id), NotFoundError);
 *
 * // String only — throws EnsureError with your message
 * const user = ensure(db.find(id), "Could not find user");
 * ```
 *
 * @example Backend — guard a database lookup
 * ```ts
 * import { ensure, defineError } from "@chan.run/ensure";
 *
 * const UserNotFoundError = defineError("UserNotFoundError");
 *
 * async function getUser(id: string) {
 *   const row = await db.users.findUnique({ where: { id } });
 *   return ensure(row, UserNotFoundError, `No user with id ${id}`);
 * }
 * ```
 *
 * @example Backend — guard environment variables at startup
 * ```ts
 * const databaseUrl = ensure(process.env.DATABASE_URL, "DATABASE_URL is required");
 * const apiKey = ensure(process.env.API_KEY, "API_KEY is required");
 * ```
 *
 * @example Backend — guard request parameters in Express
 * ```ts
 * app.get("/users/:id", (req, res) => {
 *   const id = ensure(req.params.id, ValidationError, "Missing user ID");
 *   // id is narrowed to string, never undefined
 * });
 * ```
 *
 * @example Frontend — guard a query result in React
 * ```tsx
 * function UserProfile({ userId }: { userId: string }) {
 *   const { data } = useQuery(["user", userId], () => fetchUser(userId));
 *   const user = ensure(data, "User data not loaded");
 *
 *   return <h1>{user.name}</h1>;
 * }
 * ```
 *
 * @example Frontend — guard URL search params
 * ```ts
 * const params = new URLSearchParams(window.location.search);
 * const token = ensure(params.get("token"), "Missing token in URL");
 * ```
 *
 * @example Preserving the cause of a previous error
 * ```ts
 * try {
 *   await connectToDatabase();
 * } catch (err) {
 *   ensure(null, DbError, "Connection failed", { cause: err });
 * }
 * ```
 */
export function ensure<T>(
  value: T,
  errorOrMessage: FaultErrorClass | string,
  message?: string,
  options?: { cause?: unknown },
): NonNullable<T> {
  if (value !== null && value !== undefined) {
    return value as NonNullable<T>;
  }

  if (typeof errorOrMessage === "string") {
    throw new EnsureError(errorOrMessage, options);
  }

  throw new errorOrMessage(message ?? errorOrMessage.name, options);
}
