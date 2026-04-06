---
title: ensure
kind: function
---

# ensure()

```ts
function ensure<T>(
   value, 
   errorOrMessage, 
   message?, 
options?): NonNullable<T>;
```

Defined in: [src/ensure.ts:76](https://github.com/zerocity/ensure.chan.run/blob/fd17b31e9ebff13cf02da88f3dcf89cf4e35edaf/src/ensure.ts#L76)

Assert non-null/undefined. Returns the narrowed value or throws.

Three forms:
```ts
// Full — typed error class + message
const user = ensure(db.find(id), NotFoundError, `No user: ${id}`);

// Class only — message defaults to error name
const user = ensure(db.find(id), NotFoundError);

// String only — throws EnsureError with your message
const user = ensure(db.find(id), "Could not find user");
```

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `T` |
| `errorOrMessage` | `string` \| [`FaultErrorClass`](TypeAlias.FaultErrorClass) |
| `message?` | `string` |
| `options?` | \{ `cause?`: `unknown`; \} |
| `options.cause?` | `unknown` |

## Returns

`NonNullable`\<`T`\>

## Examples

```ts
import { ensure, defineError } from "@chan.run/ensure";

const UserNotFoundError = defineError("UserNotFoundError");

async function getUser(id: string) {
  const row = await db.users.findUnique({ where: { id } });
  return ensure(row, UserNotFoundError, `No user with id ${id}`);
}
```

```ts
const databaseUrl = ensure(process.env.DATABASE_URL, "DATABASE_URL is required");
const apiKey = ensure(process.env.API_KEY, "API_KEY is required");
```

```ts
app.get("/users/:id", (req, res) => {
  const id = ensure(req.params.id, ValidationError, "Missing user ID");
  // id is narrowed to string, never undefined
});
```

```tsx
function UserProfile({ userId }: { userId: string }) {
  const { data } = useQuery(["user", userId], () => fetchUser(userId));
  const user = ensure(data, "User data not loaded");

  return <h1>{user.name}</h1>;
}
```

```ts
const params = new URLSearchParams(window.location.search);
const token = ensure(params.get("token"), "Missing token in URL");
```

```ts
try {
  await connectToDatabase();
} catch (err) {
  ensure(null, DbError, "Connection failed", { cause: err });
}
```
