import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { vi } from "vitest";

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <AuthContext.Provider
      value={{
        user: null,
        isLoggedIn: false,
        login: vi.fn(),
        logout: vi.fn(),
      }}
    >
      <BrowserRouter>{ui}</BrowserRouter>
    </AuthContext.Provider>
  );
}