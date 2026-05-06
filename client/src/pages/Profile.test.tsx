import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Profile from "./Profile";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("../api/api", () => ({
  getUser: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "1" }),
  };
});

vi.mock("../auth/AuthContext", () => ({
  useAuth: () => ({
    isLoggedIn: false,
  }),
}));

vi.mock("../components/Lightbox", () => ({
  default: ({ onClose }: any) => (
    <div data-testid="lightbox">
      Lightbox Open
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

import { getUser } from "../api/api";

const mockUser = {
  id: "1",
  name: "John Doe",
  images: [
    { id: "a", url: "/img1.jpg" },
    { id: "b", url: "/img2.jpg" },
  ],
};

test("renders user profile and images", async () => {
  (getUser as any).mockResolvedValue(mockUser);

  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );

  expect(await screen.findByText("John Doe")).toBeInTheDocument();

  expect(screen.getAllByRole("img").length).toBe(2);
});

test("shows loading initially", () => {
  (getUser as any).mockReturnValue(new Promise(() => {}));

  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test("opens lightbox when image is clicked", async () => {
  (getUser as any).mockResolvedValue(mockUser);

  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );

  const images = await screen.findAllByRole("img");

  fireEvent.click(images[0]);

  expect(screen.getByTestId("lightbox")).toBeInTheDocument();
});


test("closes lightbox when close is clicked", async () => {
  (getUser as any).mockResolvedValue(mockUser);

  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );

  const images = await screen.findAllByRole("img");

  fireEvent.click(images[0]);

  fireEvent.click(screen.getByText(/close/i));

  await waitFor(() => {
    expect(screen.queryByTestId("lightbox")).not.toBeInTheDocument();
  });
});