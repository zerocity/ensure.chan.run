---
title: Quick Start
description: Get started with @chan.run/fault in under 5 minutes
---

# Quick Start

## Installation

```bash
pnpm add @chan.run/fault
```

## 1. Guard Values

```ts
import { ensure, defineError } from "@chan.run/fault";

const NotFound = defineError("NotFound");

// Throws NotFound if null/undefined, returns narrowed value otherwise
const user = ensure(db.find(id), NotFound, `No user: ${id}`);
```

## 2. Define Errors

```ts
import { defineError } from "@chan.run/fault";

const NotFoundError = defineError("NotFoundError");
const ValidationError = defineError("ValidationError", { code: "VALIDATION" });
```

Every error has `name`, `code`, `isFault: true`, and full `Error` compatibility.

## 3. Throw Errors

```ts
import { fault } from "@chan.run/fault";

fault(NotFoundError, "User not found");
fault("RATE_LIMITED", "Too many requests"); // inline code
```

## 4. Safe Execution

```ts
import { tryAsync, match } from "@chan.run/fault";

const result = await tryAsync(() => getUser(id));

if (!result.ok) {
  match(result.error, {
    NotFoundError: (err) => respond(404, err.message),
    _: (err) => { throw err },
  });
}
```

## 5. Typed Error Flow (Advanced)

Declare error surfaces and get compile-time exhaustiveness:

```ts
import { declares, tryAsync, match } from "@chan.run/fault";

const getUser = declares([NotFoundError, DbError], async (id: string) => {
  const row = await db.users.findById(id);
  return ensure(row, NotFoundError, `No user: ${id}`);
});

// Pass declared function directly — error type narrows automatically
const result = await tryAsync(getUser, id);

if (!result.ok) {
  // TypeScript enforces you handle both error types
  match(result.error, [NotFoundError, DbError], {
    NotFoundError: (err) => respond(404, err.message),
    DbError: (err) => respond(503, "DB unavailable"),
  });
}
```
