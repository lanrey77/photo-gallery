import { screen, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { renderWithProviders } from "../test/utils";

test("shows validation errors when form is empty", async () => {
  renderWithProviders(<LoginForm />);

  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  expect(await screen.findByText(/password must/i)).toBeInTheDocument();
});

test("shows password validation error", async () => {
  renderWithProviders(<LoginForm />);

  fireEvent.input(screen.getByPlaceholderText("Email"), {
    target: { value: "test@gmail.com" },
  });

  fireEvent.input(screen.getByPlaceholderText("Password"), {
    target: { value: "abc" },
  });

  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(
    await screen.findByText(/password must be at least 4 characters/i)
  ).toBeInTheDocument();
});

test("shows invalid email error", async () => {
  renderWithProviders(<LoginForm />);

  fireEvent.input(screen.getByPlaceholderText("Email"), {
    target: { value: "abc" },
  });

  fireEvent.input(screen.getByPlaceholderText("Password"), {
    target: { value: "Abcd1" },
  });

  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();
});

test("shows uppercase validation error", async () => {
  renderWithProviders(<LoginForm />);

  fireEvent.input(screen.getByPlaceholderText("Email"), {
    target: { value: "test@gmail.com" },
  });

  fireEvent.input(screen.getByPlaceholderText("Password"), {
    target: { value: "abcd" },
  });

  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(
    await screen.findByText(/must include uppercase letter/i)
  ).toBeInTheDocument();
});