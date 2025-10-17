import App from "../components/App/App.tsx";
import { MantineProvider } from "@mantine/core";
import { StrictMode } from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { store } from "../store.ts";
import { Provider } from "react-redux";

describe("Проверка всего функционала", async () => {
  it("Проверка Input", async () => {
    render(
      <StrictMode>
        <MantineProvider>
          <Provider store={store}>
            <App></App>
          </Provider>
        </MantineProvider>
      </StrictMode>
    );
    const input = await screen.findByText(/Должность или название компании/i);
    expect(input).toBeInTheDocument();
  });
});
