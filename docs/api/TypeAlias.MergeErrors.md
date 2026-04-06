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

Defined in: [src/types.ts:83](https://github.com/zerocity/ensure.chan.run/blob/5454a2bc1f77b0499a10d4821a05e8703c6a9a22/src/types.ts#L83)

Merge error class tuples from multiple declared functions.
Use with combines() to combine error surfaces.

## Type Parameters

| Type Parameter |
| ------ |
| `TFns` *extends* `AnyDeclaredFn`[] |
