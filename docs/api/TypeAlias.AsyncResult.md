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

Defined in: [src/types.ts:28](https://github.com/zerocity/ensure.chan.run/blob/fd17b31e9ebff13cf02da88f3dcf89cf4e35edaf/src/types.ts#L28)

Result of tryAsync — error type narrows when wrapping a declared function.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `E` | `unknown` |
