import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { Application } from "../../src/client/Application";
import React from "react"
import { render } from "@testing-library/react";
import { emptyCatalogStore } from "./common";

it("contact page rendered static", async () => {
  const { asFragment } = render(
    <MemoryRouter initialIndex={0} initialEntries={["/contacts"]}>
      <Provider store={emptyCatalogStore}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  expect(asFragment()).toMatchSnapshot();
});
