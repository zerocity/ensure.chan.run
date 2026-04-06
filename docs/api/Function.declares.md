---
title: declares
kind: function
---

# declares()

```ts
function declares<TArgs, TReturn, TErrors>(_errorClasses, fn): DeclaredFn<TArgs, TReturn, TErrors>;
```

Defined in: [src/declares.ts:13](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/declares.ts#L13)

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
