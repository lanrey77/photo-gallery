
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

import type { User } from "../interfaces/users";

export const getUsers = async (location?: string) => {
  const res = await fetch(
    `${BASE_URL}/users${location ? `?location=${location}` : ""}`,
  );
  return res.json();
};

export const getUser = async (
  id: string,
  isLoggedIn: boolean,
): Promise<User> => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    headers: {
      "x-user": isLoggedIn ? "true" : "",
    },
  });

  return res.json();
};
