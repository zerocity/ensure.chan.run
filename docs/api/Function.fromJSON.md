---
title: fromJSON
kind: function
---

# fromJSON()

```ts
function fromJSON(data, registry): Error;
```

Defined in: [src/serialize.ts:44](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/serialize.ts#L44)

Deserialize a plain object back into a FaultError instance.
Requires a registry mapping names to error classes.

```ts
const registry = { NotFoundError, DbError };
const err = fromJSON(json, registry);
// err instanceof NotFoundError === true
```

Returns a generic Error if the name isn't in the registry.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`FaultErrorJSON`](Interface.FaultErrorJSON) |
| `registry` | `Record`\<`string`, [`FaultErrorClass`](TypeAlias.FaultErrorClass)\> |

## Returns

`Error`
