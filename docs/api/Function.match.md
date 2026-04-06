---
title: match
kind: function
---

# match()

## Call Signature

```ts
function match<T>(error, handlers): T;
```

Defined in: [src/match.ts:37](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/match.ts#L37)

Handle an error by matching against a handler map keyed by name or code.
Fault errors are matched by name, then by code.
Native errors (TypeError, AbortError, SyntaxError, etc.) are matched by name.
Plain `Error` (name === "Error") always falls through to `_` to avoid catching everything.

When the error type is known (from declares + tryAsync), handlers are
exhaustiveness-checked — TypeScript will error if you miss one:

```ts
const result = await tryAsync(getUser, id);
if (!result.ok) {
  // TypeScript requires handlers for NotFoundError AND DbError
  match(result.error, [NotFoundError, DbError], {
    NotFoundError: (err) => respond(404, err.message),
    DbError: (err) => respond(503, "DB unavailable"),
  });
}
```

For untyped errors, use the two-arg form with string keys + fallback:

```ts
match(error, {
  ValidationError: (err) => respond(400, err.message),
  _: (err) => { throw err },
});
```

### Type Parameters

| Type Parameter |
| ------ |
| `T` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `unknown` |
| `handlers` | [`MatchHandlers`](Interface.MatchHandlers)\<`T`\> |

### Returns

`T`

## Call Signature

```ts
function match<TErrors, THandlers>(
   error, 
   errorClasses, 
handlers): ReturnType<Extract<THandlers[keyof THandlers], (...args) => unknown>>;
```

Defined in: [src/match.ts:38](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/match.ts#L38)

Handle an error by matching against a handler map keyed by name or code.
Fault errors are matched by name, then by code.
Native errors (TypeError, AbortError, SyntaxError, etc.) are matched by name.
Plain `Error` (name === "Error") always falls through to `_` to avoid catching everything.

When the error type is known (from declares + tryAsync), handlers are
exhaustiveness-checked — TypeScript will error if you miss one:

```ts
const result = await tryAsync(getUser, id);
if (!result.ok) {
  // TypeScript requires handlers for NotFoundError AND DbError
  match(result.error, [NotFoundError, DbError], {
    NotFoundError: (err) => respond(404, err.message),
    DbError: (err) => respond(503, "DB unavailable"),
  });
}
```

For untyped errors, use the two-arg form with string keys + fallback:

```ts
match(error, {
  ValidationError: (err) => respond(400, err.message),
  _: (err) => { throw err },
});
```

### Type Parameters

| Type Parameter |
| ------ |
| `TErrors` *extends* [`NamedFaultErrorClass`](Interface.NamedFaultErrorClass)\<`string`\>[] |
| `THandlers` *extends* [`TypedMatchHandlers`](TypeAlias.TypedMatchHandlers)\<`unknown`, `TErrors`\> |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `unknown` |
| `errorClasses` | readonly \[`TErrors`\] |
| `handlers` | `THandlers` |

### Returns

`ReturnType`\<`Extract`\<`THandlers`\[keyof `THandlers`\], (...`args`) => `unknown`\>\>
