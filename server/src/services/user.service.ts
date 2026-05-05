import { users } from "../data/users.js";
import { User } from "../types/user.js";

export const getAllUsers = (location?: string): User[] => {
  if (!location) return users;
  return users.filter(u => u.location === location);
};

export const getUserById = (
  id: string,
  isLoggedIn: boolean
): User | null => {
  const user = users.find(u => u.id === id);

  if (!user) return null;

  const images = isLoggedIn
    ? user.images
    : user.images.slice(0, 3);

  return { ...user, images };
};