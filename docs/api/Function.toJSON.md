---
title: toJSON
kind: function
---

# toJSON()

```ts
function toJSON(error): FaultErrorJSON;
```

Defined in: [src/serialize.ts:50](https://github.com/zerocity/ensure.chan.run/blob/fd17b31e9ebff13cf02da88f3dcf89cf4e35edaf/src/serialize.ts#L50)

Serialize a FaultError to a plain object for JSON transport (API responses, logs).

```ts
const err = new NotFoundError("User not found");
const json = toJSON(err);
// { name: "NotFoundError", code: "NotFoundError", message: "User not found" }
```

## Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | [`FaultError`](Interface.FaultError) |

## Returns

[`FaultErrorJSON`](Interface.FaultErrorJSON)

## Examples

```ts
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error && "isFault" in err) {
    res.status(400).json({ error: toJSON(err as FaultError) });
  } else {
    res.status(500).json({ error: "Internal server error" });
  }
});
```

```ts
const result = await tryAsync(processPayment, orderId);
if (!result.ok && result.error instanceof Error && "isFault" in result.error) {
  logger.error("Payment failed", toJSON(result.error as FaultError));
  // { name: "PaymentFailedError", code: "PAYMENT_FAILED", message: "Card declined" }
}
```

```ts
// Service A — sends error over HTTP
const err = new ValidationError("Email already taken");
await fetch("https://service-b/webhook", {
  method: "POST",
  body: JSON.stringify({ event: "error", payload: toJSON(err) }),
});
```
