import events from "@testing-library/user-event";
import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import createMockStore from "redux-mock-store";

export const createTestStore = () => {
  const basename = "/hw/store";
  const api = new ExampleApi(basename);
  const cart = new CartApi();

  return initStore(api, cart);
};

export const item1 = {
  color: "red",
  description: "description",
  id: 312312,
  material: "steel",
  price: 999,
  name: "product",
};

export const item2 = {
  color: "blue",
  description: "description2",
  id: 12,
  material: "plastic",
  price: 200,
  name: "product2",
};

export const item3 = {
  color: "orange",
  description: "description3",
  id: 123,
  material: "fur",
  price: 2000,
  name: "product3",
};

export const checkInput = async (container: HTMLElement, inputId: string) => {
  const submitBtn = container.getElementsByClassName("Form-Submit")[0];
  const input = container.querySelector(`#${inputId}`);

  await events.click(submitBtn);

  expect(input?.classList).toContain("is-invalid");
};

export const initNewState = (initialState: object) => {
  const mockStore = createMockStore([]);
  const store = mockStore(initialState);

  return store;
};

export const emptyCatalogStore = initNewState({
  products: [],
  cart: {},
  details: {},
});

export const fewItemsStore = initNewState({
  products: [item1, item2, item3],
  cart: {},
  details: {},
});
