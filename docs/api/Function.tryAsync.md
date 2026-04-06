---
title: tryAsync
kind: function
---

# tryAsync()

## Call Signature

```ts
function tryAsync<TArgs, T, TErrors>(fn, ...args): Promise<AsyncResult<T, InferFaultErrors<TErrors>>>;
```

Defined in: [src/try.ts:160](https://github.com/zerocity/ensure.chan.run/blob/fd17b31e9ebff13cf02da88f3dcf89cf4e35edaf/src/try.ts#L160)

Run async code, return a discriminated result — never rejects.

Pass a declared function directly to get typed errors:
```ts
const getUser = declares([NotFoundError], async (id: string) => fetchUser(id));
const result = await tryAsync(getUser, "123");
// result.error is NotFoundError, not unknown
```

Or wrap any expression in a lambda:
```ts
const result = await tryAsync(() => fetchUser(id));
// result.error is unknown
```

### Type Parameters

| Type Parameter |
| ------ |
| `TArgs` *extends* `unknown`[] |
| `T` |
| `TErrors` *extends* [`NamedFaultErrorClass`](Interface.NamedFaultErrorClass)\<`string`\>[] |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `fn` | [`DeclaredFn`](TypeAlias.DeclaredFn)\<`TArgs`, `Promise`\<`T`\>, `TErrors`\> |
| ...`args` | `TArgs` |

### Returns

`Promise`\<[`AsyncResult`](TypeAlias.AsyncResult)\<`T`, [`InferFaultErrors`](TypeAlias.InferFaultErrors)\<`TErrors`\>\>\>

### Examples

```ts
const result = await tryAsync(getUser, req.params.id);
if (!result.ok) {
  return match(result.error, [NotFoundError, DbError], {
    NotFoundError: (e) => res.status(404).json({ error: e.message }),
    DbError: () => res.status(503).json({ error: "Service unavailable" }),
  });
}
res.json(result.data);
```

```ts
const result = await tryAsync(() => fetch("https://api.example.com/data"));
if (!result.ok) {
  logger.error("API request failed", { error: result.error });
  return fallbackData;
}
const data = await result.data.json();
```

```tsx
async function UserPage({ id }: { id: string }) {
  const result = await tryAsync(getUser, id);
  if (!result.ok) return <ErrorCard error={result.error} />;
  return <UserProfile user={result.data} />;
}
```

```ts
async function onSubmit(values: FormValues) {
  const result = await tryAsync(() => api.post("/signup", values));
  if (!result.ok) {
    match(result.error, {
      ValidationError: (e) => setFieldErrors(e.message),
      _: () => toast.error("Something went wrong"),
    });
    return;
  }
  router.push("/dashboard");
}
```

```ts
import { readFile } from "node:fs/promises";

const result = await tryAsync(() => readFile("./data.json", "utf-8"));
if (!result.ok) {
  console.error("Could not read file:", result.error);
  process.exit(1);
}
const config = JSON.parse(result.data);
```

## Call Signature

```ts
function tryAsync<T>(fn): Promise<AsyncResult<T>>;
```

Defined in: [src/try.ts:168](https://github.com/zerocity/ensure.chan.run/blob/fd17b31e9ebff13cf02da88f3dcf89cf4e35edaf/src/try.ts#L168)

Run async code, return a discriminated result — never rejects.

Pass a declared function directly to get typed errors:
```ts
const getUser = declares([NotFoundError], async (id: string) => fetchUser(id));
const result = await tryAsync(getUser, "123");
// result.error is NotFoundError, not unknown
```

Or wrap any expression in a lambda:
```ts
const result = await tryAsync(() => fetchUser(id));
// result.error is unknown
```

### Type Parameters

| Type Parameter |
| ------ |
| `T` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `fn` | () => `Promise`\<`T`\> |

### Returns

`Promise`\<[`AsyncResult`](TypeAlias.AsyncResult)\<`T`\>\>

### Examples

```ts
const result = await tryAsync(getUser, req.params.id);
if (!result.ok) {
  return match(result.error, [NotFoundError, DbError], {
    NotFoundError: (e) => res.status(404).json({ error: e.message }),
    DbError: () => res.status(503).json({ error: "Service unavailable" }),
  });
}
res.json(result.data);
```

```ts
const result = await tryAsync(() => fetch("https://api.example.com/data"));
if (!result.ok) {
  logger.error("API request failed", { error: result.error });
  return fallbackData;
}
const data = await result.data.json();
```

```tsx
async function UserPage({ id }: { id: string }) {
  const result = await tryAsync(getUser, id);
  if (!result.ok) return <ErrorCard error={result.error} />;
  return <UserProfile user={result.data} />;
}
```

```ts
async function onSubmit(values: FormValues) {
  const result = await tryAsync(() => api.post("/signup", values));
  if (!result.ok) {
    match(result.error, {
      ValidationError: (e) => setFieldErrors(e.message),
      _: () => toast.error("Something went wrong"),
    });
    return;
  }
  router.push("/dashboard");
}
```

```ts
import { readFile } from "node:fs/promises";

const result = await tryAsync(() => readFile("./data.json", "utf-8"));
if (!result.ok) {
  console.error("Could not read file:", result.error);
  process.exit(1);
}
const config = JSON.parse(result.data);
```
