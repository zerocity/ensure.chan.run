---
title: defineError
kind: function
---

# defineError()

```ts
function defineError<N>(name, options?): NamedFaultErrorClass<N>;
```

Defined in: [src/define-error.ts:34](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/define-error.ts#L34)

Define a reusable typed error class.

```ts
const NotFoundError = defineError("NotFoundError");
const ValidationError = defineError("ValidationError", { code: "VALIDATION" });
```

## Type Parameters

| Type Parameter |
| ------ |
| `N` *extends* `string` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `N` |
| `options?` | `DefineErrorOptions` |

## Returns

[`NamedFaultErrorClass`](Interface.NamedFaultErrorClass)\<`N`\>
