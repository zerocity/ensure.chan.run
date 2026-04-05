import type {
  AsyncResult,
  DeclaredFn,
  InferFaultErrors,
  NamedFaultErrorClass,
  SyncResult,
} from "./types";

/**
 * Run sync code, return a discriminated result — never throws.
 *
 * Pass a declared function directly to get typed errors:
 * ```ts
 * const parse = declares([ValidationError], (raw: string) => JSON.parse(raw));
 * const result = trySync(parse, input);
 * // result.error is ValidationError, not unknown
 * ```
 *
 * Or wrap any expression in a lambda:
 * ```ts
 * const result = trySync(() => JSON.parse(raw));
 * // result.error is unknown
 * ```
 */
export function trySync<
  TArgs extends unknown[],
  T,
  TErrors extends NamedFaultErrorClass<string>[],
>(
  fn: DeclaredFn<TArgs, T, TErrors>,
  ...args: TArgs
): SyncResult<T, InferFaultErrors<TErrors>>;
export function trySync<T>(fn: () => T): SyncResult<T>;
export function trySync<T>(
  fn: (...args: unknown[]) => T,
  ...args: unknown[]
): SyncResult<T> {
  try {
    return { ok: true, data: fn(...args) };
  } catch (error) {
    return { ok: false, error };
  }
}

/**
 * Run async code, return a discriminated result — never rejects.
 *
 * Pass a declared function directly to get typed errors:
 * ```ts
 * const getUser = declares([NotFoundError], async (id: string) => fetchUser(id));
 * const result = await tryAsync(getUser, "123");
 * // result.error is NotFoundError, not unknown
 * ```
 *
 * Or wrap any expression in a lambda:
 * ```ts
 * const result = await tryAsync(() => fetchUser(id));
 * // result.error is unknown
 * ```
 */
export function tryAsync<
  TArgs extends unknown[],
  T,
  TErrors extends NamedFaultErrorClass<string>[],
>(
  fn: DeclaredFn<TArgs, Promise<T>, TErrors>,
  ...args: TArgs
): Promise<AsyncResult<T, InferFaultErrors<TErrors>>>;
export function tryAsync<T>(fn: () => Promise<T>): Promise<AsyncResult<T>>;
export async function tryAsync<T>(
  fn: (...args: unknown[]) => Promise<T>,
  ...args: unknown[]
): Promise<AsyncResult<T>> {
  try {
    return { ok: true, data: await fn(...args) };
  } catch (error) {
    return { ok: false, error };
  }
}
