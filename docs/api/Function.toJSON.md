---
title: toJSON
kind: function
---

# toJSON()

```ts
function toJSON(error): FaultErrorJSON;
```

Defined in: [src/serialize.ts:20](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/serialize.ts#L20)

Serialize a FaultError to a plain object for JSON transport (API responses, logs).

```ts
const err = new NotFoundError("User not found");
const json = toJSON(err);
// { name: "NotFoundError", code: "NotFoundError", message: "User not found" }
```

## Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | [`FaultError`](Interface.FaultError) |

## Returns

[`FaultErrorJSON`](Interface.FaultErrorJSON)
