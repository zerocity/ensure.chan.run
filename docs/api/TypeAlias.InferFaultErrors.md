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

Defined in: [src/types.ts:45](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/types.ts#L45)

Extract the error union from a declared function's error classes.
Maps [typeof NotFoundError, typeof DbError] → NotFoundError | DbError.

## Type Parameters

| Type Parameter |
| ------ |
| `TErrors` *extends* [`NamedFaultErrorClass`](Interface.NamedFaultErrorClass)\<`string`\>[] |
