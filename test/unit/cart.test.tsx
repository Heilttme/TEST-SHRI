import {
  addToCart,
  checkout,
  checkoutComplete,
  clearCart,
} from "../../src/client/store";
import { Form } from "../../src/client/components/Form";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import events from "@testing-library/user-event";
import { checkInput, createTestStore, initNewState, item1 } from "./common";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { Application } from "../../src/client/Application";

describe("cart actions", () => {
  it("adds an item to the cart", () => {
    const store = createTestStore();
    const dispatch = store.dispatch;

    dispatch(addToCart(item1));

    const cartState = store.getState().cart;

    expect(cartState).toHaveProperty(item1.id.toString());

    expect(cartState[item1.id]).toEqual({
      name: "product",
      count: 1,
      price: 999,
    });
  });

  it("cleared cart is empty", () => {
    const store = createTestStore();
    const dispatch = store.dispatch;

    dispatch(addToCart(item1));
    dispatch(clearCart());

    const cartState = store.getState().cart;

    expect(Object.keys(cartState).length).toEqual(0);
  });

  it("checkout with no name lights input", async () => {
    const store = createTestStore();
    const dispatch = store.dispatch;

    dispatch(addToCart(item1));

    const FormContainer = <Form onSubmit={() => {}} />;

    const { container } = render(FormContainer);

    await checkInput(container, "f-name");
  });

  it("checkout with no phone lights input", async () => {
    const store = createTestStore();
    const dispatch = store.dispatch;

    dispatch(addToCart(item1));

    const FormContainer = <Form onSubmit={() => {}} />;

    const { container } = render(FormContainer);

    await checkInput(container, "f-phone");
  });

  it("checkout with no address lights input", async () => {
    const store = createTestStore();
    const dispatch = store.dispatch;

    dispatch(addToCart(item1));

    const FormContainer = <Form onSubmit={() => {}} />;

    const { container } = render(FormContainer);

    await checkInput(container, "f-address");
  });

  it("incorrect phone regex lights input", async () => {
    const store = createTestStore();
    const dispatch = store.dispatch;

    dispatch(addToCart(item1));

    const FormContainer = <Form onSubmit={() => {}} />;

    const { container } = render(FormContainer);

    const submitBtn = container.getElementsByClassName("Form-Submit")[0];
    const input = container.querySelector("#f-phone")!;

    await events.type(input, "+123");
    await events.click(submitBtn);

    expect(input?.classList).toContain("is-invalid");
  });

  it("correct phone regex does nothing", async () => {
    const store = createTestStore();
    const dispatch = store.dispatch;

    dispatch(addToCart(item1));

    const FormContainer = <Form onSubmit={() => {}} />;

    const { container } = render(FormContainer);

    const submitBtn = container.getElementsByClassName("Form-Submit")[0];
    const input = container.querySelector("#f-phone")!;

    await events.type(input, "+12312312312");
    await events.click(submitBtn);

    expect(input?.classList).not.toContain("is-invalid");
  });
});

it("successful checkout on correct input data", async () => {
  const testStore = createTestStore();
  const dispatch = testStore.dispatch;

  dispatch(addToCart(item1));

  const { container } = render(
    <MemoryRouter initialIndex={0} initialEntries={["/cart"]}>
      <Provider store={testStore}>
        <Application />
      </Provider>
    </MemoryRouter>
  );
  const nameInput = container.querySelector(`#f-name`)!;
  const phoneInput = container.querySelector("#f-phone")!;
  const addressInput = container.querySelector(`#f-address`)!;
  const name = "NIKITA";
  const phone = "9757865437845638";
  const address = "Moscow, Red Square";

  await events.type(nameInput, name);
  await events.type(phoneInput, phone);
  await events.type(addressInput, address);
  dispatch(checkoutComplete(1));

  await waitFor(() => {
    const successWindow = container.querySelector(".Cart-SuccessMessage");
    expect(successWindow).not.toBe(null);
  });

});
