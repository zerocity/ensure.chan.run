---
title: MatchHandlers
description: Handler map for match(). Named keys match fault errors; _ is the fallback.
kind: interface
---

# MatchHandlers\<T\>

Defined in: [src/types.ts:91](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/types.ts#L91)

Handler map for match(). Named keys match fault errors; _ is the fallback.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Indexable

```ts
[nameOrCode: string]: ((error) => T) | undefined
```

## Properties

### \_?

```ts
optional _?: (error) => T;
```

Defined in: [src/types.ts:93](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/types.ts#L93)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `unknown` |

#### Returns

`T`
