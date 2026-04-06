---
title: ensure
kind: function
---

# ensure()

```ts
function ensure<T>(
   value, 
   errorOrMessage, 
   message?, 
options?): NonNullable<T>;
```

Defined in: [src/ensure.ts:25](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/ensure.ts#L25)

Assert non-null/undefined. Returns the narrowed value or throws.

Three forms:
```ts
// Full — typed error class + message
const user = ensure(db.find(id), NotFoundError, `No user: ${id}`);

// Class only — message defaults to error name
const user = ensure(db.find(id), NotFoundError);

// String only — throws EnsureError with your message
const user = ensure(db.find(id), "Could not find user");
```

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `T` |
| `errorOrMessage` | `string` \| [`FaultErrorClass`](TypeAlias.FaultErrorClass) |
| `message?` | `string` |
| `options?` | \{ `cause?`: `unknown`; \} |
| `options.cause?` | `unknown` |

## Returns

`NonNullable`\<`T`\>
