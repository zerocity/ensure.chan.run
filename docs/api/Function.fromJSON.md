---
title: fromJSON
kind: function
---

# fromJSON()

```ts
function fromJSON(data, registry): Error;
```

Defined in: [src/serialize.ts:115](https://github.com/zerocity/ensure.chan.run/blob/fd17b31e9ebff13cf02da88f3dcf89cf4e35edaf/src/serialize.ts#L115)

Deserialize a plain object back into a FaultError instance.
Requires a registry mapping names to error classes.

```ts
const registry = { NotFoundError, DbError };
const err = fromJSON(json, registry);
// err instanceof NotFoundError === true
```

Returns a generic Error if the name isn't in the registry.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`FaultErrorJSON`](Interface.FaultErrorJSON) |
| `registry` | `Record`\<`string`, [`FaultErrorClass`](TypeAlias.FaultErrorClass)\> |

## Returns

`Error`

## Examples

```ts
const registry = { ValidationError, NotFoundError, RateLimitError };

async function apiCall(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.json();
    throw fromJSON(body.error, registry);
    // Throws a real NotFoundError instance, matchable with match()
  }
  return res.json();
}
```

```ts
const registry = { PaymentFailedError, OrderError, DbError };

queue.on("dead-letter", (msg) => {
  const error = fromJSON(msg.error, registry);
  match(error, {
    PaymentFailedError: (e) => retryPayment(msg.orderId),
    _: (e) => logger.error("Unrecoverable", { error: e }),
  });
});
```

```ts
const json: FaultErrorJSON = {
  name: "NotFoundError",
  code: "NotFoundError",
  message: "User not found",
};
const err = fromJSON(json, { NotFoundError });

expect(err).toBeInstanceOf(NotFoundError);
expect(err.message).toBe("User not found");
```
