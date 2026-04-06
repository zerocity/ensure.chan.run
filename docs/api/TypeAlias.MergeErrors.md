---
title: MergeErrors
description: |-
  Merge error class tuples from multiple declared functions.
  Use with combines() to combine error surfaces.
kind: type
---

# MergeErrors\<TFns\>

```ts
type MergeErrors<TFns> = TFns extends [infer First, ...(infer Rest extends AnyDeclaredFn[])] ? [...ExtractErrors<First>, ...MergeErrors<Rest>] : [];
```

Defined in: [src/types.ts:83](https://github.com/zerocity/ensure.chan.run/blob/fd17b31e9ebff13cf02da88f3dcf89cf4e35edaf/src/types.ts#L83)

Merge error class tuples from multiple declared functions.
Use with combines() to combine error surfaces.

## Type Parameters

| Type Parameter |
| ------ |
| `TFns` *extends* `AnyDeclaredFn`[] |
