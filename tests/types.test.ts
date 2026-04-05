import { assertType, describe, expectTypeOf, it } from "vitest";
import {
  declares,
  defineError,
  type InferFaultErrors,
  match,
  type NamedFaultError,
  type NamedFaultErrorClass,
  tryAsync,
  trySync,
} from "../src/index";

// ============================================================================
// defineError — name string literal preserved in type
// ============================================================================

describe("defineError types", () => {
  it("returns NamedFaultErrorClass with literal name", () => {
    const MyError = defineError("MyError");
    expectTypeOf(MyError).toMatchTypeOf<NamedFaultErrorClass<"MyError">>();
  });

  it("instance has literal name type", () => {
    const MyError = defineError("MyError");
    const err = new MyError("test");
    expectTypeOf(err.name).toEqualTypeOf<"MyError">();
    expectTypeOf(err.isFault).toEqualTypeOf<true>();
  });
});

// ============================================================================
// declares — preserves error class tuple
// ============================================================================

describe("declares types", () => {
  it("preserves error classes in the function type", () => {
    const NotFoundError = defineError("NotFoundError");
    const DbError = defineError("DbError");
    const fn = declares([NotFoundError, DbError], (id: string) => id);

    type Errors = (typeof fn)["__faultErrors"];
    expectTypeOf<Errors>().toEqualTypeOf<
      [typeof NotFoundError, typeof DbError]
    >();
  });
});

// ============================================================================
// trySync / tryAsync — error narrows when passing declared fn directly
// ============================================================================

describe("trySync type narrowing", () => {
  it("narrows error when passing declared function directly", () => {
    const ParseError = defineError("ParseError");
    const safeParse = declares([ParseError], (raw: string) => JSON.parse(raw));

    // Direct pass — error narrows to ParseError
    const result = trySync(safeParse, "{}");
    if (!result.ok) {
      expectTypeOf(result.error).toMatchTypeOf<NamedFaultError<"ParseError">>();
    }
  });

  it("error is unknown for plain lambda", () => {
    const result = trySync(() => JSON.parse("{}"));
    if (!result.ok) {
      expectTypeOf(result.error).toBeUnknown();
    }
  });
});

describe("tryAsync type narrowing", () => {
  it("narrows error when passing declared function directly", async () => {
    const NotFoundError = defineError("NotFoundError");
    const DbError = defineError("DbError");
    const getUser = declares([NotFoundError, DbError], async (id: string) => ({
      id,
    }));

    // Direct pass — error narrows to union
    const result = await tryAsync(getUser, "123");
    if (!result.ok) {
      expectTypeOf(result.error).toMatchTypeOf<
        NamedFaultError<"NotFoundError"> | NamedFaultError<"DbError">
      >();
    }
  });

  it("error is unknown for plain lambda", async () => {
    const result = await tryAsync(async () => "ok");
    if (!result.ok) {
      expectTypeOf(result.error).toBeUnknown();
    }
  });
});

// ============================================================================
// InferFaultErrors — utility type
// ============================================================================

describe("InferFaultErrors", () => {
  it("extracts instance union from error class tuple", () => {
    const A = defineError("A");
    const B = defineError("B");
    type Errors = InferFaultErrors<[typeof A, typeof B]>;
    expectTypeOf<Errors>().toMatchTypeOf<
      NamedFaultError<"A"> | NamedFaultError<"B">
    >();
  });
});

// ============================================================================
// match — exhaustiveness checking (3-arg typed overload)
// ============================================================================

describe("match exhaustiveness", () => {
  it("typed overload requires all declared error handlers", () => {
    const NotFoundError = defineError("NotFoundError");
    const DbError = defineError("DbError");

    const err = new NotFoundError("test") as
      | InstanceType<typeof NotFoundError>
      | InstanceType<typeof DbError>;

    const result = match(err, [NotFoundError, DbError], {
      NotFoundError: (e) => `not found: ${e.message}`,
      DbError: (e) => `db: ${e.message}`,
    });

    assertType<string>(result);
  });

  it("typed overload allows optional _ fallback", () => {
    const NotFoundError = defineError("NotFoundError");
    const err = new NotFoundError("test");

    match(err, [NotFoundError], {
      NotFoundError: (e) => e.message,
      _: () => "fallback",
    });
  });

  it("untyped overload still works with string keys", () => {
    const err = new Error("test");

    const result = match(err, {
      SomeError: (e) => e.message,
      _: () => "fallback",
    });

    expectTypeOf(result).toBeString();
  });

  it("typed handler narrows the error name", () => {
    const NotFoundError = defineError("NotFoundError");
    const DbError = defineError("DbError");

    const err = new NotFoundError("test") as
      | InstanceType<typeof NotFoundError>
      | InstanceType<typeof DbError>;

    match(err, [NotFoundError, DbError], {
      NotFoundError: (e) => {
        expectTypeOf(e.name).toEqualTypeOf<"NotFoundError">();
        return e.message;
      },
      DbError: (e) => {
        expectTypeOf(e.name).toEqualTypeOf<"DbError">();
        return e.message;
      },
    });
  });

  it("works end-to-end: declares → tryAsync → match", async () => {
    const NotFoundError = defineError("NotFoundError");
    const DbError = defineError("DbError");
    const getUser = declares([NotFoundError, DbError], async (id: string) => ({
      id,
    }));

    const result = await tryAsync(getUser, "123");

    if (!result.ok) {
      // Error is typed — match requires both handlers
      const msg = match(result.error, [NotFoundError, DbError], {
        NotFoundError: (e) => `404: ${e.message}`,
        DbError: (e) => `503: ${e.message}`,
      });
      assertType<string>(msg);
    }
  });
});
