---
title: tryAsync
kind: function
---

# tryAsync()

## Call Signature

```ts
function tryAsync<TArgs, T, TErrors>(fn, ...args): Promise<AsyncResult<T, InferFaultErrors<TErrors>>>;
```

Defined in: [src/try.ts:61](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/try.ts#L61)

Run async code, return a discriminated result — never rejects.

Pass a declared function directly to get typed errors:
```ts
const getUser = declares([NotFoundError], async (id: string) => fetchUser(id));
const result = await tryAsync(getUser, "123");
// result.error is NotFoundError, not unknown
```

Or wrap any expression in a lambda:
```ts
const result = await tryAsync(() => fetchUser(id));
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
| `fn` | [`DeclaredFn`](TypeAlias.DeclaredFn)\<`TArgs`, `Promise`\<`T`\>, `TErrors`\> |
| ...`args` | `TArgs` |

### Returns

`Promise`\<[`AsyncResult`](TypeAlias.AsyncResult)\<`T`, [`InferFaultErrors`](TypeAlias.InferFaultErrors)\<`TErrors`\>\>\>

## Call Signature

```ts
function tryAsync<T>(fn): Promise<AsyncResult<T>>;
```

Defined in: [src/try.ts:69](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/try.ts#L69)

Run async code, return a discriminated result — never rejects.

Pass a declared function directly to get typed errors:
```ts
const getUser = declares([NotFoundError], async (id: string) => fetchUser(id));
const result = await tryAsync(getUser, "123");
// result.error is NotFoundError, not unknown
```

Or wrap any expression in a lambda:
```ts
const result = await tryAsync(() => fetchUser(id));
// result.error is unknown
```

### Type Parameters

| Type Parameter |
| ------ |
| `T` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `fn` | () => `Promise`\<`T`\> |

### Returns

`Promise`\<[`AsyncResult`](TypeAlias.AsyncResult)\<`T`\>\>
