---
title: FaultError
description: Marker interface for errors created by fault.
kind: interface
---

# FaultError

Defined in: [src/types.ts:2](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/types.ts#L2)

Marker interface for errors created by fault.

## Extends

- `Error`

## Extended by

- [`NamedFaultError`](Interface.NamedFaultError)

## Properties

### cause?

```ts
optional cause?: unknown;
```

Defined in: node\_modules/.pnpm/typescript@6.0.2/node\_modules/typescript/lib/lib.es2022.error.d.ts:24

#### Inherited from

```ts
Error.cause
```

***

### code

```ts
readonly code: string;
```

Defined in: [src/types.ts:4](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/types.ts#L4)

***

### isFault

```ts
readonly isFault: true;
```

Defined in: [src/types.ts:5](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/types.ts#L5)

***

### message

```ts
message: string;
```

Defined in: node\_modules/.pnpm/typescript@6.0.2/node\_modules/typescript/lib/lib.es5.d.ts:1075

#### Inherited from

```ts
Error.message
```

***

### name

```ts
readonly name: string;
```

Defined in: [src/types.ts:3](https://github.com/zerocity/ensure.chan.run/blob/47ca8d97d3dead4220597e51a37f7aa5f4211c59/src/types.ts#L3)

#### Overrides

```ts
Error.name
```

***

### stack?

```ts
optional stack?: string;
```

Defined in: node\_modules/.pnpm/typescript@6.0.2/node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

```ts
Error.stack
```
