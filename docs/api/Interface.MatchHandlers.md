---
title: MatchHandlers
description: Handler map for match(). Named keys match fault errors; _ is the fallback.
kind: interface
---

# MatchHandlers\<T\>

Defined in: [src/types.ts:91](https://github.com/zerocity/ensure.chan.run/blob/5454a2bc1f77b0499a10d4821a05e8703c6a9a22/src/types.ts#L91)

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

Defined in: [src/types.ts:93](https://github.com/zerocity/ensure.chan.run/blob/5454a2bc1f77b0499a10d4821a05e8703c6a9a22/src/types.ts#L93)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `unknown` |

#### Returns

`T`
