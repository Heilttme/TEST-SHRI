import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { Application } from "../../src/client/Application";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import {
  createTestStore,
  emptyCatalogStore,
  fewItemsStore,
  initNewState,
  item1,
  item2,
  item3,
} from "./common";
import {
  addToCart,
  productsLoad,
  productsLoaded,
} from "../../src/client/store";

it("empty catalog rendered", () => {
  const { asFragment } = render(
    <MemoryRouter initialIndex={0} initialEntries={["/catalog"]}>
      <Provider store={emptyCatalogStore}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});

it("empty catalog rendered", () => {
  const { asFragment } = render(
    <MemoryRouter initialIndex={0} initialEntries={["/catalog"]}>
      <Provider store={emptyCatalogStore}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});

it("catalog with items rendered", () => {
  const { getAllByTestId } = render(
    <MemoryRouter initialIndex={0} initialEntries={["/catalog"]}>
      <Provider store={fewItemsStore}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  const foundItem1 = getAllByTestId(item1.id)[0];
  const foundItem2 = getAllByTestId(item2.id)[0];
  const foundItem3 = getAllByTestId(item3.id)[0];

  expect(foundItem1).not.toBe(undefined);
  expect(foundItem2).not.toBe(undefined);
  expect(foundItem3).not.toBe(undefined);
});

it("added to cart item diplays 'Item in cart' text in catalog", async () => {
  const testStore = initNewState({
    products: [{ name: item1.name, id: item1.id, price: item1.price }],
    cart: { [item1.id]: { name: item1.name, count: 1, price: item1.price } },
  });

  const { getAllByTestId, container } = render(
    <MemoryRouter initialIndex={0} initialEntries={["/catalog"]}>
      <Provider store={testStore}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  const successText = getAllByTestId(item1.id)[0].getElementsByClassName(
    "text-success"
  )[0];

  expect(successText).not.toBe(undefined);
});
