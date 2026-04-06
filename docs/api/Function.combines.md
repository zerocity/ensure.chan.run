---
title: combines
kind: function
---

# combines()

```ts
function combines<TArgs, TReturn, TFns>(_sources, fn): DeclaredFn<TArgs, TReturn, MergeErrors<TFns>>;
```

Defined in: [src/declares.ts:43](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/declares.ts#L43)

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
