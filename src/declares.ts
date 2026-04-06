import type { DeclaredFn, MergeErrors, NamedFaultErrorClass } from "./types";

/**
 * Annotate a function's error surface — purely type-level, zero runtime cost.
 *
 * ```ts
 * const getUser = declares([NotFoundError, DatabaseError], async (id: string) => {
 *   const row = await db.users.findById(id);
 *   return ensure(row, NotFoundError, `No user: ${id}`);
 * });
 * ```
 *
 * @example Service layer — declare what a function can throw
 * ```ts
 * const NotFoundError = defineError("NotFoundError");
 * const DbError = defineError("DbError");
 *
 * const getUser = declares([NotFoundError, DbError], async (id: string) => {
 *   const row = await db.users.findById(id);
 *   return ensure(row, NotFoundError, `No user: ${id}`);
 * });
 *
 * // Callers using tryAsync get typed errors automatically:
 * const result = await tryAsync(getUser, "123");
 * if (!result.ok) {
 *   result.error; // NotFoundError | DbError — not unknown
 * }
 * ```
 *
 * @example Repository pattern
 * ```ts
 * const DbError = defineError("DbError");
 *
 * export const userRepo = {
 *   findById: declares([DbError], async (id: string) => {
 *     return await db.query("SELECT * FROM users WHERE id = $1", [id]);
 *   }),
 *   create: declares([DbError], async (data: CreateUser) => {
 *     return await db.query("INSERT INTO users ...", [data.name, data.email]);
 *   }),
 * };
 * ```
 *
 * @example API client method
 * ```ts
 * const ApiError = defineError("ApiError");
 * const TimeoutError = defineError("TimeoutError");
 *
 * const fetchProducts = declares([ApiError, TimeoutError], async (category: string) => {
 *   const res = await fetch(`/api/products?category=${category}`);
 *   if (!res.ok) fault(ApiError, `HTTP ${res.status}`);
 *   return res.json() as Promise<Product[]>;
 * });
 * ```
 */
export function declares<
  TArgs extends unknown[],
  TReturn,
  TErrors extends NamedFaultErrorClass<string>[],
>(
  _errorClasses: [...TErrors],
  fn: (...args: TArgs) => TReturn,
): DeclaredFn<TArgs, TReturn, TErrors> {
  return fn as DeclaredFn<TArgs, TReturn, TErrors>;
}

/**
 * Compose error surfaces from multiple declared functions into one.
 * Use when a function calls several declared functions and can throw any of their errors.
 *
 * ```ts
 * const getUser = declares([NotFoundError, DbError], ...);
 * const getOrder = declares([OrderError, DbError], ...);
 *
 * const getUserOrder = combines(
 *   [getUser, getOrder],
 *   async (userId: string, orderId: string) => {
 *     const user = await getUser(userId);
 *     const order = await getOrder(orderId);
 *     return { user, order };
 *   },
 * );
 * // getUserOrder can throw NotFoundError | DbError | OrderError
 * ```
 *
 * @example Multi-service orchestrator
 * ```ts
 * const getUser = declares([UserNotFoundError, DbError], ...);
 * const getBilling = declares([BillingError, DbError], ...);
 * const getPermissions = declares([AuthError], ...);
 *
 * const getDashboard = combines(
 *   [getUser, getBilling, getPermissions],
 *   async (userId: string) => {
 *     const [user, billing, perms] = await Promise.all([
 *       getUser(userId),
 *       getBilling(userId),
 *       getPermissions(userId),
 *     ]);
 *     return { user, billing, perms };
 *   },
 * );
 *
 * // Error type is UserNotFoundError | DbError | BillingError | AuthError
 * const result = await tryAsync(getDashboard, userId);
 * ```
 *
 * @example Composing service + repository layers
 * ```ts
 * const findUser = declares([DbError], ...);
 * const validateToken = declares([AuthError, TokenExpiredError], ...);
 *
 * const authenticateUser = combines(
 *   [findUser, validateToken],
 *   async (token: string) => {
 *     const claims = validateToken(token);
 *     return findUser(claims.userId);
 *   },
 * );
 * // authenticateUser throws DbError | AuthError | TokenExpiredError
 * ```
 */
export function combines<
  TArgs extends unknown[],
  TReturn,
  TFns extends { readonly __faultErrors: NamedFaultErrorClass<string>[] }[],
>(
  _sources: [...TFns],
  fn: (...args: TArgs) => TReturn,
): DeclaredFn<TArgs, TReturn, MergeErrors<TFns>> {
  return fn as DeclaredFn<TArgs, TReturn, MergeErrors<TFns>>;
}
