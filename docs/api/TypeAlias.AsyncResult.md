---
title: AsyncResult
description: Result of tryAsync — error type narrows when wrapping a declared function.
kind: type
---

# AsyncResult\<T, E\>

```ts
type AsyncResult<T, E> = 
  | {
  data: T;
  ok: true;
}
  | {
  error: E;
  ok: false;
};
```

Defined in: [src/types.ts:28](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/types.ts#L28)

Result of tryAsync — error type narrows when wrapping a declared function.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `E` | `unknown` |
