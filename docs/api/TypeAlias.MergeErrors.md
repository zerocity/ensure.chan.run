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

Defined in: [src/types.ts:83](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/types.ts#L83)

Merge error class tuples from multiple declared functions.
Use with combines() to combine error surfaces.

## Type Parameters

| Type Parameter |
| ------ |
| `TFns` *extends* `AnyDeclaredFn`[] |
