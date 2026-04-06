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

Defined in: [src/fault.ts:68](https://github.com/zerocity/ensure.chan.run/blob/fd17b31e9ebff13cf02da88f3dcf89cf4e35edaf/src/fault.ts#L68)

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

## Examples

```ts
import { fault, defineError } from "@chan.run/ensure";

const ValidationError = defineError("ValidationError");

function validateAge(age: number) {
  if (age < 0 || age > 150) {
    fault(ValidationError, `Invalid age: ${age}`);
  }
}
```

```ts
try {
  await stripe.charges.create(params);
} catch (err) {
  fault(PaymentFailedError, "Charge failed", { cause: err });
}
```

```ts
// No need to defineError — just use a string code.
// Same string always reuses the same error class internally.
fault("TODO", "Not implemented yet");
fault("UNAUTHORIZED", "You must be logged in");
```

```ts
function getStatusColor(status: "ok" | "warn" | "error"): string {
  switch (status) {
    case "ok": return "green";
    case "warn": return "yellow";
    case "error": return "red";
    default: fault("UNREACHABLE", `Unknown status: ${status}`);
  }
}
```

```ts
function requireAdmin(user: User) {
  if (user.role !== "admin") {
    fault(ForbiddenError, `User ${user.id} is not an admin`);
  }
}
```
