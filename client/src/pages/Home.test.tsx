import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Home from "./Home";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("../api/api", () => ({
  getUsers: vi.fn(),
}));

vi.mock("../auth/AuthContext", () => ({
  useAuth: () => ({
    isLoggedIn: false,
  }),
}));

import { getUsers } from "../api/api";

const mockUsers = [
  { id: "1", name: "John Doe", location: "Suffolk" },
  { id: "2", name: "Jane Smith", location: "Norfolk" },
];

test("renders users after API load", async () => {
  (getUsers as any).mockResolvedValue(mockUsers);

  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  expect(screen.getByText(/photographers/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });
});

test("shows loading skeleton initially", async () => {
  (getUsers as any).mockReturnValue(new Promise(() => {})); 

  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  expect(screen.getAllByText("", { selector: "div.animate-pulse" }).length).toBeGreaterThan(0);
});

test("shows no users message", async () => {
  (getUsers as any).mockResolvedValue([]);

  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  expect(await screen.findByText(/no users found/i)).toBeInTheDocument();
});

test("changes location filter triggers API call", async () => {
  (getUsers as any).mockResolvedValue([]);

  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  const select = screen.getByRole("combobox");

  fireEvent.change(select, {
    target: { value: "Norfolk" },
  });

  await waitFor(() => {
    expect(getUsers).toHaveBeenCalledWith("Norfolk");
  });
});