---
title: combines
kind: function
---

# combines()

```ts
function combines<TArgs, TReturn, TFns>(_sources, fn): DeclaredFn<TArgs, TReturn, MergeErrors<TFns>>;
```

Defined in: [src/declares.ts:123](https://github.com/zerocity/ensure.chan.run/blob/5454a2bc1f77b0499a10d4821a05e8703c6a9a22/src/declares.ts#L123)

Compose error surfaces from multiple declared functions into one.
Use when a function calls several declared functions and can throw any of their errors.

```ts
const getUser = declares([NotFoundError, DbError], ...);
const getOrder = declares([OrderError, DbError], ...);

const getUserOrder = combines(
  [getUser, getOrder],
  async (userId: string, orderId: string) => {
    const user = await getUser(userId);
    const order = await getOrder(orderId);
    return { user, order };
  },
);
// getUserOrder can throw NotFoundError | DbError | OrderError
```

## Type Parameters

| Type Parameter |
| ------ |
| `TArgs` *extends* `unknown`[] |
| `TReturn` |
| `TFns` *extends* \{ `__faultErrors`: [`NamedFaultErrorClass`](Interface.NamedFaultErrorClass)\<`string`\>[]; \}[] |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_sources` | \[`...TFns[]`\] |
| `fn` | (...`args`) => `TReturn` |

## Returns

[`DeclaredFn`](TypeAlias.DeclaredFn)\<`TArgs`, `TReturn`, [`MergeErrors`](TypeAlias.MergeErrors)\<`TFns`\>\>

## Examples

```ts
const getUser = declares([UserNotFoundError, DbError], ...);
const getBilling = declares([BillingError, DbError], ...);
const getPermissions = declares([AuthError], ...);

const getDashboard = combines(
  [getUser, getBilling, getPermissions],
  async (userId: string) => {
    const [user, billing, perms] = await Promise.all([
      getUser(userId),
      getBilling(userId),
      getPermissions(userId),
    ]);
    return { user, billing, perms };
  },
);

// Error type is UserNotFoundError | DbError | BillingError | AuthError
const result = await tryAsync(getDashboard, userId);
```

```ts
const findUser = declares([DbError], ...);
const validateToken = declares([AuthError, TokenExpiredError], ...);

const authenticateUser = combines(
  [findUser, validateToken],
  async (token: string) => {
    const claims = validateToken(token);
    return findUser(claims.userId);
  },
);
// authenticateUser throws DbError | AuthError | TokenExpiredError
```
