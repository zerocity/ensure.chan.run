/** Marker interface for errors created by fault. */
export interface FaultError extends Error {
  readonly name: string;
  readonly code: string;
  readonly isFault: true;
}

/** A fault error whose name is known at the type level. */
export interface NamedFaultError<N extends string> extends FaultError {
  readonly name: N;
}

/** Constructor for a FaultError class (untyped name). */
export interface FaultErrorClass {
  new (message?: string, options?: { cause?: unknown }): FaultError;
  readonly prototype: FaultError;
}

/**
 * Constructor for a FaultError class with a known name.
 * Does not extend FaultErrorClass to prevent InstanceType from
 * picking the wider FaultError construct signature.
 */
export interface NamedFaultErrorClass<N extends string> {
  new (message?: string, options?: { cause?: unknown }): NamedFaultError<N>;
  readonly prototype: NamedFaultError<N>;
}

/** Result of trySync — error type narrows when wrapping a declared function. */
export type SyncResult<T, E = unknown> =
  | { ok: true; data: T }
  | { ok: false; error: E };

/** Result of tryAsync — error type narrows when wrapping a declared function. */
export type AsyncResult<T, E = unknown> =
  | { ok: true; data: T }
  | { ok: false; error: E };

/** A function annotated with declares(). */
export type DeclaredFn<
  TArgs extends unknown[],
  TReturn,
  TErrors extends NamedFaultErrorClass<string>[],
> = ((...args: TArgs) => TReturn) & {
  readonly __faultErrors: TErrors;
};

/**
 * Extract the error union from a declared function's error classes.
 * Maps [typeof NotFoundError, typeof DbError] → NotFoundError | DbError.
 */
export type InferFaultErrors<TErrors extends NamedFaultErrorClass<string>[]> =
  InstanceType<TErrors[number]>;

/** Extract the name string literals from a tuple of error classes. */
export type ErrorNames<TErrors extends NamedFaultErrorClass<string>[]> =
  TErrors[number] extends NamedFaultErrorClass<infer N> ? N : never;

/**
 * Typed handler map for match() — requires a handler for every declared error name.
 * Use with errors from declares() for exhaustiveness checking.
 */
export type TypedMatchHandlers<
  T,
  TErrors extends NamedFaultErrorClass<string>[],
> = {
  [K in ErrorNames<TErrors>]: (
    error: InstanceType<Extract<TErrors[number], NamedFaultErrorClass<K>>>,
  ) => T;
} & {
  _?: ((error: unknown) => T) | undefined;
};

/** Handler map for match(). Named keys match fault errors; _ is the fallback. */
export interface MatchHandlers<T> {
  [nameOrCode: string]: ((error: FaultError) => T) | undefined;
  _?: (error: unknown) => T;
}
