const BASE = "http://localhost:5000";

import type { User } from "../types/users";

export const getUsers = async (location?: string) => {
  const res = await fetch(
    `${BASE}/users${location ? `?location=${location}` : ""}`,
  );
  return res.json();
};

export const getUser = async (
  id: string,
  isLoggedIn: boolean,
): Promise<User> => {
  const res = await fetch(`${BASE}/users/${id}`, {
    headers: {
      "x-user": isLoggedIn ? "true" : "",
    },
  });

  return res.json();
};
