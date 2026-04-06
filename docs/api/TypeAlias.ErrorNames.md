---
title: ErrorNames
description: Extract the name string literals from a tuple of error classes.
kind: type
---

# ErrorNames\<TErrors\>

```ts
type ErrorNames<TErrors> = TErrors[number] extends NamedFaultErrorClass<infer N> ? N : never;
```

Defined in: [src/types.ts:49](https://github.com/zerocity/ensure.chan.run/blob/5454a2bc1f77b0499a10d4821a05e8703c6a9a22/src/types.ts#L49)

Extract the name string literals from a tuple of error classes.

## Type Parameters

| Type Parameter |
| ------ |
| `TErrors` *extends* [`NamedFaultErrorClass`](Interface.NamedFaultErrorClass)\<`string`\>[] |
