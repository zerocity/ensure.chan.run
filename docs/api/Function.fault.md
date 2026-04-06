---
title: fault
kind: function
---

# fault()

```ts
function fault(
   target, 
   message, 
   options?): never;
```

Defined in: [src/fault.ts:17](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/fault.ts#L17)

Throw a typed error — from a class or an inline string code.

```ts
fault(NotFoundError, "User not found");
fault("RATE_LIMITED", "Too many requests");
```

## Parameters

| Parameter | Type |
| ------ | ------ |
| `target` | `string` \| [`FaultErrorClass`](TypeAlias.FaultErrorClass) |
| `message` | `string` |
| `options?` | \{ `cause?`: `unknown`; \} |
| `options.cause?` | `unknown` |

## Returns

`never`
