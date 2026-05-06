import { screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { renderWithProviders } from "../test/utils";

test("shows login when logged out", () => {
  renderWithProviders(<Navbar />);
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});