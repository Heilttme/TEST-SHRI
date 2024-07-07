import { getAllByTestId, render } from "@testing-library/react";
import { initNewState, item1 } from "./common";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { Application } from "../../src/client/Application";
import events from "@testing-library/user-event";

it("cart has a badge with items count", () => {
  const testStore = initNewState({
    cart: { [item1.id]: { name: item1.name, count: 1, price: item1.price } },
  });

  const { getByText } = render(
    <MemoryRouter initialIndex={0} initialEntries={["/catalog"]}>
      <Provider store={testStore}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  const cartWithBadge = getByText(`Cart (1)`)

  expect(cartWithBadge).not.toBe(undefined);
});

it("cart has no badge with empty cart", () => {
  const testStore = initNewState({
    cart: { },
  });

  const { getByText } = render(
    <MemoryRouter initialIndex={0} initialEntries={["/catalog"]}>
      <Provider store={testStore}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  const cartWithBadge = getByText(`Cart`)

  expect(cartWithBadge).not.toBe(undefined);
});

function resizeWindow(width: number, height: number) {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event('resize'));
}


it("mobile navbar collapses on any nav list click", async () => {
  resizeWindow(800, 400)

  const testStore = initNewState({
    cart: { },
  });

  const { container, asFragment } = render(
    <MemoryRouter initialIndex={0} initialEntries={["/catalog"]}>
      <Provider store={testStore}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  const hamburger = container.getElementsByClassName("navbar-toggler-icon")[0]
  const catalogLink = container.getElementsByClassName("nav-link")[0]

  await events.click(hamburger)
  await events.click(catalogLink)

  expect(asFragment()).toMatchSnapshot();
});

