import App from "../components/App/App.tsx";
import { MantineProvider } from "@mantine/core";
import { StrictMode } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { store } from "../store.ts";
import { Provider } from "react-redux";
import { userEvent } from "@testing-library/user-event";
import { expect } from "vitest";
import { wait } from "@testing-library/user-event/dist/cjs/utils/index.js";

describe("Проверка всего функционала", async () => {
  it("Проверка Input", async () => {
    try {
      render(
        <StrictMode>
          <MantineProvider>
            <Provider store={store}>
              <App></App>
            </Provider>
          </MantineProvider>
        </StrictMode>
      );
    } catch (error) {
      console.error(error);
    }
    expect(true).toBe(true);
    const input = screen.getByTestId(/input-emp/i);
    expect(input).toBeInTheDocument();
    await userEvent.type(input, "Java");
    expect(input).toHaveValue("Java");
    await userEvent.keyboard(`{enter}`);
  });
  it("Проверка добавления Skills", async () => {
    try {
      render(
        <StrictMode>
          <MantineProvider>
            <Provider store={store}>
              <App></App>
            </Provider>
          </MantineProvider>
        </StrictMode>
      );
    } catch (error) {
      console.error(error);
    }
    const input = screen.getByTestId(/skill-input/i);
    expect(input).toBeInTheDocument();
    await userEvent.type(input, "Java");
    expect(input).toHaveValue("Java");
    await userEvent.keyboard(`{enter}`);
    const skillList = await screen.getByTestId(/skill-list/i);
    expect(skillList).toBeInTheDocument();
    const javaSkill = await within(skillList).findByText(/Java/i);
    expect(javaSkill).toBeInTheDocument();
  });
});
