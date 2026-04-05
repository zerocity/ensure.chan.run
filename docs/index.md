---
title: "@chan.run/fault"
description: "Type-safe errors without the boilerplate"
---

# @chan.run/fault

Type-safe errors without the boilerplate. Make error contracts explicit with zero ceremony.

## Why?

JavaScript error handling is broken by default. Functions throw, but callers have no idea what. `@chan.run/fault` makes errors part of the contract — with zero friction.

## Install

```bash
pnpm add @chan.run/fault
```

## Quick Example

```ts
import { defineError, ensure, declares, tryAsync, match } from "@chan.run/fault";

const NotFoundError = defineError("NotFoundError");
const DbError = defineError("DbError");

const getUser = declares([NotFoundError, DbError], async (id: string) => {
  const row = await db.users.findById(id);
  return ensure(row, NotFoundError, `No user: ${id}`);
});

const result = await tryAsync(getUser, id);

if (!result.ok) {
  match(result.error, [NotFoundError, DbError], {
    NotFoundError: (err) => respond(404, err.message),
    DbError: (err) => respond(503, "DB unavailable"),
  });
}
```

## API Overview

| Export        | Purpose                                      |
|---------------|----------------------------------------------|
| `ensure`      | Assert non-null/undefined, throw if missing  |
| `defineError` | Define a reusable typed error class          |
| `fault()`     | Throw a typed error — inline or from a class |
| `trySync()`   | Run sync code, return `{ ok, data/error }`   |
| `tryAsync()`  | Run async code, return `{ ok, data/error }`  |
| `declares()`  | Annotate a function's error surface          |
| `match()`     | Handle errors by type with a handler map     |

## Environment Support

| Environment        | Supported |
|--------------------|-----------|
| Node.js 18+        | ✅        |
| Deno               | ✅        |
| Bun                | ✅        |
| Browser            | ✅        |
| Cloudflare Workers | ✅        |
