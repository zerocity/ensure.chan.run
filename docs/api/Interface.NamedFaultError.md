---
title: NamedFaultError
description: A fault error whose name is known at the type level.
kind: interface
---

# NamedFaultError\<N\>

Defined in: [src/types.ts:9](https://github.com/zerocity/ensure.chan.run/blob/5454a2bc1f77b0499a10d4821a05e8703c6a9a22/src/types.ts#L9)

A fault error whose name is known at the type level.

## Extends

- [`FaultError`](Interface.FaultError)

## Type Parameters

| Type Parameter |
| ------ |
| `N` *extends* `string` |

## Properties

### cause?

```ts
optional cause?: unknown;
```

Defined in: node\_modules/.pnpm/typescript@6.0.2/node\_modules/typescript/lib/lib.es2022.error.d.ts:24

#### Inherited from

[`FaultError`](Interface.FaultError).[`cause`](Interface.FaultError.md#cause)

***

### code

```ts
readonly code: string;
```

Defined in: [src/types.ts:4](https://github.com/zerocity/ensure.chan.run/blob/5454a2bc1f77b0499a10d4821a05e8703c6a9a22/src/types.ts#L4)

#### Inherited from

[`FaultError`](Interface.FaultError).[`code`](Interface.FaultError.md#code)

***

### isFault

```ts
readonly isFault: true;
```

Defined in: [src/types.ts:5](https://github.com/zerocity/ensure.chan.run/blob/5454a2bc1f77b0499a10d4821a05e8703c6a9a22/src/types.ts#L5)

#### Inherited from

[`FaultError`](Interface.FaultError).[`isFault`](Interface.FaultError.md#isfault)

***

### message

```ts
message: string;
```

Defined in: node\_modules/.pnpm/typescript@6.0.2/node\_modules/typescript/lib/lib.es5.d.ts:1075

#### Inherited from

[`FaultError`](Interface.FaultError).[`message`](Interface.FaultError.md#message)

***

### name

```ts
readonly name: N;
```

Defined in: [src/types.ts:10](https://github.com/zerocity/ensure.chan.run/blob/5454a2bc1f77b0499a10d4821a05e8703c6a9a22/src/types.ts#L10)

#### Overrides

[`FaultError`](Interface.FaultError).[`name`](Interface.FaultError.md#name)

***

### stack?

```ts
optional stack?: string;
```

Defined in: node\_modules/.pnpm/typescript@6.0.2/node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

[`FaultError`](Interface.FaultError).[`stack`](Interface.FaultError.md#stack)
