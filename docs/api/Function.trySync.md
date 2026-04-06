---
title: trySync
kind: function
---

# trySync()

## Call Signature

```ts
function trySync<TArgs, T, TErrors>(fn, ...args): SyncResult<T, InferFaultErrors<TErrors>>;
```

Defined in: [src/try.ts:66](https://github.com/zerocity/ensure.chan.run/blob/fd17b31e9ebff13cf02da88f3dcf89cf4e35edaf/src/try.ts#L66)

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

### Examples

```ts
const result = trySync(() => JSON.parse(userInput));
if (!result.ok) {
  console.error("Invalid JSON:", result.error);
  return fallbackConfig;
}
return result.data;
```

```ts
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const result = trySync(() => JSON.parse(atob(token.split(".")[1])));
  return result.ok ? result.data : null;
}
```

```ts
const ConfigError = defineError("ConfigError");

const loadConfig = declares([ConfigError], (path: string) => {
  const raw = fs.readFileSync(path, "utf-8");
  const result = trySync(() => JSON.parse(raw));
  if (!result.ok) fault(ConfigError, `Invalid config: ${path}`, { cause: result.error });
  return result.data as AppConfig;
});

const result = trySync(loadConfig, "./config.json");
// result.error is ConfigError, not unknown
```

```ts
function getStoredTheme(): Theme | null {
  const result = trySync(() => JSON.parse(localStorage.getItem("theme") ?? ""));
  return result.ok ? result.data : null;
}
```

## Call Signature

```ts
function trySync<T>(fn): SyncResult<T>;
```

Defined in: [src/try.ts:74](https://github.com/zerocity/ensure.chan.run/blob/fd17b31e9ebff13cf02da88f3dcf89cf4e35edaf/src/try.ts#L74)

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

### Examples

```ts
const result = trySync(() => JSON.parse(userInput));
if (!result.ok) {
  console.error("Invalid JSON:", result.error);
  return fallbackConfig;
}
return result.data;
```

```ts
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const result = trySync(() => JSON.parse(atob(token.split(".")[1])));
  return result.ok ? result.data : null;
}
```

```ts
const ConfigError = defineError("ConfigError");

const loadConfig = declares([ConfigError], (path: string) => {
  const raw = fs.readFileSync(path, "utf-8");
  const result = trySync(() => JSON.parse(raw));
  if (!result.ok) fault(ConfigError, `Invalid config: ${path}`, { cause: result.error });
  return result.data as AppConfig;
});

const result = trySync(loadConfig, "./config.json");
// result.error is ConfigError, not unknown
```

```ts
function getStoredTheme(): Theme | null {
  const result = trySync(() => JSON.parse(localStorage.getItem("theme") ?? ""));
  return result.ok ? result.data : null;
}
```
