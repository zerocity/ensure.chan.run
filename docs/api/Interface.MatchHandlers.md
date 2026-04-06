---
title: MatchHandlers
description: Handler map for match(). Named keys match fault errors; _ is the fallback.
kind: interface
---

# MatchHandlers\<T\>

Defined in: [src/types.ts:91](https://github.com/zerocity/ensure.chan.run/blob/fd17b31e9ebff13cf02da88f3dcf89cf4e35edaf/src/types.ts#L91)

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

Defined in: [src/types.ts:93](https://github.com/zerocity/ensure.chan.run/blob/fd17b31e9ebff13cf02da88f3dcf89cf4e35edaf/src/types.ts#L93)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `unknown` |

#### Returns

`T`
