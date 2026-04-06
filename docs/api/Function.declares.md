---
title: declares
kind: function
---

# declares()

```ts
function declares<TArgs, TReturn, TErrors>(_errorClasses, fn): DeclaredFn<TArgs, TReturn, TErrors>;
```

Defined in: [src/declares.ts:56](https://github.com/zerocity/ensure.chan.run/blob/5454a2bc1f77b0499a10d4821a05e8703c6a9a22/src/declares.ts#L56)

Annotate a function's error surface — purely type-level, zero runtime cost.

```ts
const getUser = declares([NotFoundError, DatabaseError], async (id: string) => {
  const row = await db.users.findById(id);
  return ensure(row, NotFoundError, `No user: ${id}`);
});
```

## Type Parameters

| Type Parameter |
| ------ |
| `TArgs` *extends* `unknown`[] |
| `TReturn` |
| `TErrors` *extends* [`NamedFaultErrorClass`](Interface.NamedFaultErrorClass)\<`string`\>[] |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_errorClasses` | \[`...TErrors[]`\] |
| `fn` | (...`args`) => `TReturn` |

## Returns

[`DeclaredFn`](TypeAlias.DeclaredFn)\<`TArgs`, `TReturn`, `TErrors`\>

## Examples

```ts
const NotFoundError = defineError("NotFoundError");
const DbError = defineError("DbError");

const getUser = declares([NotFoundError, DbError], async (id: string) => {
  const row = await db.users.findById(id);
  return ensure(row, NotFoundError, `No user: ${id}`);
});

// Callers using tryAsync get typed errors automatically:
const result = await tryAsync(getUser, "123");
if (!result.ok) {
  result.error; // NotFoundError | DbError — not unknown
}
```

```ts
const DbError = defineError("DbError");

export const userRepo = {
  findById: declares([DbError], async (id: string) => {
    return await db.query("SELECT * FROM users WHERE id = $1", [id]);
  }),
  create: declares([DbError], async (data: CreateUser) => {
    return await db.query("INSERT INTO users ...", [data.name, data.email]);
  }),
};
```

```ts
const ApiError = defineError("ApiError");
const TimeoutError = defineError("TimeoutError");

const fetchProducts = declares([ApiError, TimeoutError], async (category: string) => {
  const res = await fetch(`/api/products?category=${category}`);
  if (!res.ok) fault(ApiError, `HTTP ${res.status}`);
  return res.json() as Promise<Product[]>;
});
```
