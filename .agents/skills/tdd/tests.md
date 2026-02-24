# Good and Bad Tests

## Good Tests

**Integration-style**: Test through real interfaces, not mocks of internal parts.

```typescript
// GOOD: Tests observable behavior
test("user can checkout with valid cart", async () => {
  const cart = createCart();
  cart.add(product);
  const result = await checkout(cart, paymentMethod);
  expect(result.status).toBe("confirmed");
});
```

Characteristics:

- Tests behavior users/callers care about
- Uses public API only
- Survives internal refactors
- Describes WHAT, not HOW
- One logical assertion per test

## Bad Tests

**Implementation-detail tests**: Coupled to internal structure.

```typescript
// BAD: Tests implementation details
test("checkout calls paymentService.process", async () => {
  const mockPayment = jest.mock(paymentService);
  await checkout(cart, payment);
  expect(mockPayment.process).toHaveBeenCalledWith(cart.total);
});
```

Red flags:

- Mocking internal collaborators
- Testing private methods
- Asserting on call counts/order
- Test breaks when refactoring without behavior change
- Test name describes HOW not WHAT
- Verifying through external means instead of interface

```typescript
// BAD: Bypasses interface to verify
test("createUser saves to database", async () => {
  await createUser({ name: "Alice" });
  const row = await db.query("SELECT * FROM users WHERE name = ?", ["Alice"]);
  expect(row).toBeDefined();
});

// GOOD: Verifies through interface
test("createUser makes user retrievable", async () => {
  const user = await createUser({ name: "Alice" });
  const retrieved = await getUser(user.id);
  expect(retrieved.name).toBe("Alice");
});
```

## Context Matters: Interaction Tests in Outside-In TDD

The "bad test" above is bad in **classical TDD** -- it couples tests to implementation that might change.

In **outside-in TDD**, interaction tests serve a different purpose: they are **design-time contracts** for collaborators that don't exist yet.

```typescript
// VALID in outside-in: Designing the payment collaborator's interface
test("checkout delegates payment processing to payment service", async () => {
  const mockPayment = mock<PaymentService>();
  mockPayment.process.mockResolvedValue({ status: "ok" });
  const checkout = new CheckoutFlow(mockPayment);

  await checkout.execute(cart);

  expect(mockPayment.process).toHaveBeenCalledWith(cart.total);
});
```

This is valid **only when**:
- PaymentService doesn't exist yet and you're discovering its interface
- This is an inner-loop test in a double-loop cycle
- An outer acceptance test will verify the real integration
- The mock will be replaced when the real PaymentService is built

Same test is **bad** when:
- PaymentService already exists and works
- No acceptance test covers the real integration
- The mock is permanent
