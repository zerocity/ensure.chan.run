---
title: match
kind: function
---

# match()

## Call Signature

```ts
function match<T>(error, handlers): T;
```

Defined in: [src/match.ts:104](https://github.com/zerocity/ensure.chan.run/blob/fd17b31e9ebff13cf02da88f3dcf89cf4e35edaf/src/match.ts#L104)

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

### Examples

```ts
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  match(err, {
    ValidationError: (e) => res.status(400).json({ error: e.message }),
    UnauthorizedError: (e) => res.status(401).json({ error: "Unauthorized" }),
    NotFoundError: (e) => res.status(404).json({ error: e.message }),
    _: (e) => {
      console.error("Unhandled error", e);
      res.status(500).json({ error: "Internal server error" });
    },
  });
});
```

```ts
const result = await tryAsync(createOrder, userId, items);
if (!result.ok) {
  return match(result.error, [OutOfStockError, PaymentFailedError, DbError], {
    OutOfStockError: (e) => Response.json({ error: e.message }, { status: 409 }),
    PaymentFailedError: (e) => Response.json({ error: "Payment failed" }, { status: 402 }),
    DbError: () => Response.json({ error: "Try again later" }, { status: 503 }),
  });
}
```

```tsx
async function handleSubmit(data: FormData) {
  const result = await tryAsync(submitForm, data);
  if (!result.ok) {
    match(result.error, {
      ValidationError: (e) => toast.warning(e.message),
      NetworkError: () => toast.error("Check your connection"),
      _: () => toast.error("Something went wrong"),
    });
  }
}
```

```ts
const result = await tryAsync(() => fetch(url, { signal }));
if (!result.ok) {
  match(result.error, {
    AbortError: () => console.log("Request cancelled"),
    TypeError: (e) => console.error("Network failure:", e.message),
    _: (e) => { throw e },
  });
}
```

```ts
function reportError(error: unknown) {
  match(error, {
    ValidationError: (e) => metrics.increment("validation_error"),
    DbError: (e) => {
      logger.error("Database error", { message: e.message, code: e.code });
      alertOncall("db-failure");
    },
    _: (e) => logger.warn("Unknown error", { error: e }),
  });
}
```

## Call Signature

```ts
function match<TErrors, THandlers>(
   error, 
   errorClasses, 
handlers): ReturnType<Extract<THandlers[keyof THandlers], (...args) => unknown>>;
```

Defined in: [src/match.ts:105](https://github.com/zerocity/ensure.chan.run/blob/fd17b31e9ebff13cf02da88f3dcf89cf4e35edaf/src/match.ts#L105)

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

### Examples

```ts
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  match(err, {
    ValidationError: (e) => res.status(400).json({ error: e.message }),
    UnauthorizedError: (e) => res.status(401).json({ error: "Unauthorized" }),
    NotFoundError: (e) => res.status(404).json({ error: e.message }),
    _: (e) => {
      console.error("Unhandled error", e);
      res.status(500).json({ error: "Internal server error" });
    },
  });
});
```

```ts
const result = await tryAsync(createOrder, userId, items);
if (!result.ok) {
  return match(result.error, [OutOfStockError, PaymentFailedError, DbError], {
    OutOfStockError: (e) => Response.json({ error: e.message }, { status: 409 }),
    PaymentFailedError: (e) => Response.json({ error: "Payment failed" }, { status: 402 }),
    DbError: () => Response.json({ error: "Try again later" }, { status: 503 }),
  });
}
```

```tsx
async function handleSubmit(data: FormData) {
  const result = await tryAsync(submitForm, data);
  if (!result.ok) {
    match(result.error, {
      ValidationError: (e) => toast.warning(e.message),
      NetworkError: () => toast.error("Check your connection"),
      _: () => toast.error("Something went wrong"),
    });
  }
}
```

```ts
const result = await tryAsync(() => fetch(url, { signal }));
if (!result.ok) {
  match(result.error, {
    AbortError: () => console.log("Request cancelled"),
    TypeError: (e) => console.error("Network failure:", e.message),
    _: (e) => { throw e },
  });
}
```

```ts
function reportError(error: unknown) {
  match(error, {
    ValidationError: (e) => metrics.increment("validation_error"),
    DbError: (e) => {
      logger.error("Database error", { message: e.message, code: e.code });
      alertOncall("db-failure");
    },
    _: (e) => logger.warn("Unknown error", { error: e }),
  });
}
```
