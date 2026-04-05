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
 * const getUserOrder = composeDeclares(
 *   [getUser, getOrder],
 *   async (userId: string, orderId: string) => {
 *     const user = await getUser(userId);
 *     const order = await getOrder(orderId);
 *     return { user, order };
 *   },
 * );
 * // getUserOrder can throw NotFoundError | DbError | OrderError
 * ```
 */
export function composeDeclares<
  TArgs extends unknown[],
  TReturn,
  TFns extends { readonly __faultErrors: NamedFaultErrorClass<string>[] }[],
>(
  _sources: [...TFns],
  fn: (...args: TArgs) => TReturn,
): DeclaredFn<TArgs, TReturn, MergeErrors<TFns>> {
  return fn as DeclaredFn<TArgs, TReturn, MergeErrors<TFns>>;
}
