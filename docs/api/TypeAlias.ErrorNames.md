---
title: ErrorNames
description: Extract the name string literals from a tuple of error classes.
kind: type
---

# ErrorNames\<TErrors\>

```ts
type ErrorNames<TErrors> = TErrors[number] extends NamedFaultErrorClass<infer N> ? N : never;
```

Defined in: [src/types.ts:49](https://github.com/zerocity/ensure.chan.run/blob/fd17b31e9ebff13cf02da88f3dcf89cf4e35edaf/src/types.ts#L49)

Extract the name string literals from a tuple of error classes.

## Type Parameters

| Type Parameter |
| ------ |
| `TErrors` *extends* [`NamedFaultErrorClass`](Interface.NamedFaultErrorClass)\<`string`\>[] |
