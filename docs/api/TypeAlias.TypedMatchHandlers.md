---
title: TypedMatchHandlers
description: |-
  Typed handler map for match() — requires a handler for every declared error name.
  Use with errors from declares() for exhaustiveness checking.
kind: type
---

# TypedMatchHandlers\<T, TErrors\>

```ts
type TypedMatchHandlers<T, TErrors> = { [K in ErrorNames<TErrors>]: (error: InstanceType<Extract<TErrors[number], NamedFaultErrorClass<K>>>) => T } & {
  _?: (error) => T;
};
```

Defined in: [src/types.ts:56](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/types.ts#L56)

Typed handler map for match() — requires a handler for every declared error name.
Use with errors from declares() for exhaustiveness checking.

## Type Declaration

### \_?

```ts
optional _?: (error) => T;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `unknown` |

#### Returns

`T`

## Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `TErrors` *extends* [`NamedFaultErrorClass`](Interface.NamedFaultErrorClass)\<`string`\>[] |
