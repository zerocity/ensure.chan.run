---
title: defineError
kind: function
---

# defineError()

```ts
function defineError<N>(name, options?): NamedFaultErrorClass<N>;
```

Defined in: [src/define-error.ts:91](https://github.com/zerocity/ensure.chan.run/blob/fd17b31e9ebff13cf02da88f3dcf89cf4e35edaf/src/define-error.ts#L91)

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

## Examples

```ts
// errors/auth.ts
export const UnauthorizedError = defineError("UnauthorizedError");
export const TokenExpiredError = defineError("TokenExpiredError");
export const ForbiddenError = defineError("ForbiddenError");

// errors/billing.ts
export const PaymentFailedError = defineError("PaymentFailedError");
export const QuotaExceededError = defineError("QuotaExceededError");
```

```ts
const RateLimitError = defineError("RateLimitError", { code: "RATE_LIMITED" });

// In an API handler:
// err.name  → "RateLimitError"  (for matching)
// err.code  → "RATE_LIMITED"    (for API response payloads)
```

```ts
class HttpError extends Error {
  status = 500;
}

const NotFoundError = defineError("NotFoundError", { base: HttpError });
const err = new NotFoundError("gone");
err instanceof HttpError; // true
err.status;               // 500
```

```ts
const InvalidEmailError = defineError("InvalidEmailError", { code: "INVALID_EMAIL" });
const RequiredFieldError = defineError("RequiredFieldError", { code: "REQUIRED" });

function validateEmail(value: string) {
  if (!value) fault(RequiredFieldError, "Email is required");
  if (!value.includes("@")) fault(InvalidEmailError, "Not a valid email");
}
```

```ts
const DbError = defineError("DbError");
const err = new DbError("connection lost");

err instanceof Error;   // true
err instanceof DbError;  // true
err.name;                // "DbError"
err.message;             // "connection lost"
err.isFault;             // true
err.stack;               // full stack trace
```
