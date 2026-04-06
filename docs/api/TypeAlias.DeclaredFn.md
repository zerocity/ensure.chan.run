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

Defined in: [src/types.ts:33](https://github.com/zerocity/ensure.chan.run/blob/5454a2bc1f77b0499a10d4821a05e8703c6a9a22/src/types.ts#L33)

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
