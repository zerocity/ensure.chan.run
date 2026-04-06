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

Defined in: [src/types.ts:28](https://github.com/zerocity/ensure.chan.run/blob/5454a2bc1f77b0499a10d4821a05e8703c6a9a22/src/types.ts#L28)

Result of tryAsync — error type narrows when wrapping a declared function.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `E` | `unknown` |
