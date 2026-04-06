---
title: NamedFaultErrorClass
description: Constructor for a FaultError class with a known name.
kind: interface
---

# NamedFaultErrorClass\<N\>

Defined in: [src/types.ts:14](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/types.ts#L14)

Constructor for a FaultError class with a known name.

## Type Parameters

| Type Parameter |
| ------ |
| `N` *extends* `string` |

## Constructors

### Constructor

```ts
new NamedFaultErrorClass(message?, options?): NamedFaultError<N>;
```

Defined in: [src/types.ts:15](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/types.ts#L15)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `message?` | `string` |
| `options?` | \{ `cause?`: `unknown`; \} |
| `options.cause?` | `unknown` |

#### Returns

[`NamedFaultError`](Interface.NamedFaultError)\<`N`\>

## Properties

### prototype

```ts
readonly prototype: NamedFaultError<N>;
```

Defined in: [src/types.ts:16](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/types.ts#L16)
