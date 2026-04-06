---
title: trySync
kind: function
---

# trySync()

## Call Signature

```ts
function trySync<TArgs, T, TErrors>(fn, ...args): SyncResult<T, InferFaultErrors<TErrors>>;
```

Defined in: [src/try.ts:25](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/try.ts#L25)

Run sync code, return a discriminated result — never throws.

Pass a declared function directly to get typed errors:
```ts
const parse = declares([ValidationError], (raw: string) => JSON.parse(raw));
const result = trySync(parse, input);
// result.error is ValidationError, not unknown
```

Or wrap any expression in a lambda:
```ts
const result = trySync(() => JSON.parse(raw));
// result.error is unknown
```

### Type Parameters

| Type Parameter |
| ------ |
| `TArgs` *extends* `unknown`[] |
| `T` |
| `TErrors` *extends* [`NamedFaultErrorClass`](Interface.NamedFaultErrorClass)\<`string`\>[] |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `fn` | [`DeclaredFn`](TypeAlias.DeclaredFn)\<`TArgs`, `T`, `TErrors`\> |
| ...`args` | `TArgs` |

### Returns

[`SyncResult`](TypeAlias.SyncResult)\<`T`, [`InferFaultErrors`](TypeAlias.InferFaultErrors)\<`TErrors`\>\>

## Call Signature

```ts
function trySync<T>(fn): SyncResult<T>;
```

Defined in: [src/try.ts:33](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/try.ts#L33)

Run sync code, return a discriminated result — never throws.

Pass a declared function directly to get typed errors:
```ts
const parse = declares([ValidationError], (raw: string) => JSON.parse(raw));
const result = trySync(parse, input);
// result.error is ValidationError, not unknown
```

Or wrap any expression in a lambda:
```ts
const result = trySync(() => JSON.parse(raw));
// result.error is unknown
```

### Type Parameters

| Type Parameter |
| ------ |
| `T` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `fn` | () => `T` |

### Returns

[`SyncResult`](TypeAlias.SyncResult)\<`T`\>
