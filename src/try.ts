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
 *
 * @example Parse JSON safely
 * ```ts
 * const result = trySync(() => JSON.parse(userInput));
 * if (!result.ok) {
 *   console.error("Invalid JSON:", result.error);
 *   return fallbackConfig;
 * }
 * return result.data;
 * ```
 *
 * @example Decode a JWT payload without a library throwing on bad input
 * ```ts
 * function decodeJwtPayload(token: string): Record<string, unknown> | null {
 *   const result = trySync(() => JSON.parse(atob(token.split(".")[1])));
 *   return result.ok ? result.data : null;
 * }
 * ```
 *
 * @example With a declared function for typed errors
 * ```ts
 * const ConfigError = defineError("ConfigError");
 *
 * const loadConfig = declares([ConfigError], (path: string) => {
 *   const raw = fs.readFileSync(path, "utf-8");
 *   const result = trySync(() => JSON.parse(raw));
 *   if (!result.ok) fault(ConfigError, `Invalid config: ${path}`, { cause: result.error });
 *   return result.data as AppConfig;
 * });
 *
 * const result = trySync(loadConfig, "./config.json");
 * // result.error is ConfigError, not unknown
 * ```
 *
 * @example Frontend — safely read from localStorage
 * ```ts
 * function getStoredTheme(): Theme | null {
 *   const result = trySync(() => JSON.parse(localStorage.getItem("theme") ?? ""));
 *   return result.ok ? result.data : null;
 * }
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
 *
 * @example Backend — database query
 * ```ts
 * const result = await tryAsync(getUser, req.params.id);
 * if (!result.ok) {
 *   return match(result.error, [NotFoundError, DbError], {
 *     NotFoundError: (e) => res.status(404).json({ error: e.message }),
 *     DbError: () => res.status(503).json({ error: "Service unavailable" }),
 *   });
 * }
 * res.json(result.data);
 * ```
 *
 * @example Backend — fetch wrapper
 * ```ts
 * const result = await tryAsync(() => fetch("https://api.example.com/data"));
 * if (!result.ok) {
 *   logger.error("API request failed", { error: result.error });
 *   return fallbackData;
 * }
 * const data = await result.data.json();
 * ```
 *
 * @example Frontend — React Server Component
 * ```tsx
 * async function UserPage({ id }: { id: string }) {
 *   const result = await tryAsync(getUser, id);
 *   if (!result.ok) return <ErrorCard error={result.error} />;
 *   return <UserProfile user={result.data} />;
 * }
 * ```
 *
 * @example Frontend — form submission with error handling
 * ```ts
 * async function onSubmit(values: FormValues) {
 *   const result = await tryAsync(() => api.post("/signup", values));
 *   if (!result.ok) {
 *     match(result.error, {
 *       ValidationError: (e) => setFieldErrors(e.message),
 *       _: () => toast.error("Something went wrong"),
 *     });
 *     return;
 *   }
 *   router.push("/dashboard");
 * }
 * ```
 *
 * @example File I/O with Node.js
 * ```ts
 * import { readFile } from "node:fs/promises";
 *
 * const result = await tryAsync(() => readFile("./data.json", "utf-8"));
 * if (!result.ok) {
 *   console.error("Could not read file:", result.error);
 *   process.exit(1);
 * }
 * const config = JSON.parse(result.data);
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
