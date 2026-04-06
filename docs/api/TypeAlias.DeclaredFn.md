---
title: DeclaredFn
description: A function annotated with declares().
kind: type
---

# DeclaredFn\<TArgs, TReturn, TErrors\>

```ts
type DeclaredFn<TArgs, TReturn, TErrors> = (...args) => TReturn & {
  __faultErrors: TErrors;
};
```

Defined in: [src/types.ts:33](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/types.ts#L33)

A function annotated with declares().

## Type Declaration

### \_\_faultErrors

```ts
readonly __faultErrors: TErrors;
```

## Type Parameters

| Type Parameter |
| ------ |
| `TArgs` *extends* `unknown`[] |
| `TReturn` |
| `TErrors` *extends* [`NamedFaultErrorClass`](Interface.NamedFaultErrorClass)\<`string`\>[] |
