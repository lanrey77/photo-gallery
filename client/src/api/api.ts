const BASE = "http://localhost:5000";

export const getUsers = async (location?: string) => {
  const res = await fetch(
    `${BASE}/users${location ? `?location=${location}` : ""}`
  );
  return res.json();
};

export const getUser = async (id: string, loggedIn: boolean) => {
  const res = await fetch(`${BASE}/users/${id}`, {
    headers: {
      "x-user": loggedIn ? "true" : ""
    }
  });
  return res.json();
};