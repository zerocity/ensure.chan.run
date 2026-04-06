---
title: InferFaultErrors
description: |-
  Extract the error union from a declared function's error classes.
  Maps [typeof NotFoundError, typeof DbError] → NotFoundError | DbError.
kind: type
---

# InferFaultErrors\<TErrors\>

```ts
type InferFaultErrors<TErrors> = InstanceType<TErrors[number]>;
```

Defined in: [src/types.ts:45](https://github.com/zerocity/ensure.chan.run/blob/5454a2bc1f77b0499a10d4821a05e8703c6a9a22/src/types.ts#L45)

Extract the error union from a declared function's error classes.
Maps [typeof NotFoundError, typeof DbError] → NotFoundError | DbError.

## Type Parameters

| Type Parameter |
| ------ |
| `TErrors` *extends* [`NamedFaultErrorClass`](Interface.NamedFaultErrorClass)\<`string`\>[] |
