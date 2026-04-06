---
title: API Reference
description: "@chan.run/ensure — Type-safe errors without the boilerplate."
---

# API Reference

@chan.run/ensure — Type-safe errors without the boilerplate.

## Interfaces

| Interface | Description |
| ------ | ------ |
| [FaultError](Interface.FaultError) | Marker interface for errors created by fault. |
| [FaultErrorJSON](Interface.FaultErrorJSON) | Serialized representation of a FaultError for JSON transport. |
| [MatchHandlers](Interface.MatchHandlers) | Handler map for match(). Named keys match fault errors; _ is the fallback. |
| [NamedFaultError](Interface.NamedFaultError) | A fault error whose name is known at the type level. |
| [NamedFaultErrorClass](Interface.NamedFaultErrorClass) | Constructor for a FaultError class with a known name. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [AsyncResult](TypeAlias.AsyncResult) | Result of tryAsync — error type narrows when wrapping a declared function. |
| [DeclaredFn](TypeAlias.DeclaredFn) | A function annotated with declares(). |
| [ErrorNames](TypeAlias.ErrorNames) | Extract the name string literals from a tuple of error classes. |
| [FaultErrorClass](TypeAlias.FaultErrorClass) | Shorthand for NamedFaultErrorClass with any name. |
| [InferFaultErrors](TypeAlias.InferFaultErrors) | Extract the error union from a declared function's error classes. Maps [typeof NotFoundError, typeof DbError] → NotFoundError | DbError. |
| [MergeErrors](TypeAlias.MergeErrors) | Merge error class tuples from multiple declared functions. Use with combines() to combine error surfaces. |
| [SyncResult](TypeAlias.SyncResult) | Result of trySync — error type narrows when wrapping a declared function. |
| [TypedMatchHandlers](TypeAlias.TypedMatchHandlers) | Typed handler map for match() — requires a handler for every declared error name. Use with errors from declares() for exhaustiveness checking. |

## Variables

| Variable | Description |
| ------ | ------ |
| [EnsureError](Variable.EnsureError) | Built-in error for string-form ensure calls. Match on "EnsureError" to remap to a concrete typed error. |

## Functions

| Function | Description |
| ------ | ------ |
| [combines](Function.combines) | Compose error surfaces from multiple declared functions into one. Use when a function calls several declared functions and can throw any of their errors. |
| [declares](Function.declares) | Annotate a function's error surface — purely type-level, zero runtime cost. |
| [defineError](Function.defineError) | Define a reusable typed error class. |
| [ensure](Function.ensure) | Assert non-null/undefined. Returns the narrowed value or throws. |
| [fault](Function.fault) | Throw a typed error — from a class or an inline string code. |
| [fromJSON](Function.fromJSON) | Deserialize a plain object back into a FaultError instance. Requires a registry mapping names to error classes. |
| [match](Function.match) | Handle an error by matching against a handler map keyed by name or code. Fault errors are matched by name, then by code. Native errors (TypeError, AbortError, SyntaxError, etc.) are matched by name. Plain `Error` (name === "Error") always falls through to `_` to avoid catching everything. |
| [toJSON](Function.toJSON) | Serialize a FaultError to a plain object for JSON transport (API responses, logs). |
| [tryAsync](Function.tryAsync) | Run async code, return a discriminated result — never rejects. |
| [trySync](Function.trySync) | Run sync code, return a discriminated result — never throws. |
