import { describe, it, expect, vi } from "vitest";
import { getAllUsers, getUserById } from "../services/user.service.js";

vi.mock("../data/users.js", () => ({
  users: [
    {
      id: "1",
      name: "John",
      location: "Suffolk",
      images: [
        { id: "a", url: "img1.jpg" },
        { id: "b", url: "img2.jpg" },
        { id: "c", url: "img3.jpg" },
        { id: "d", url: "img4.jpg" },
      ],
    },
    {
      id: "2",
      name: "Jane",
      location: "Norfolk",
      images: [
        { id: "x", url: "imgx.jpg" },
      ],
    },
  ],
}));

it("returns all users when no location is provided", () => {
  const result = getAllUsers();

  expect(result.length).toBe(2);
});


it("filters users by location", () => {
  const result = getAllUsers("Suffolk");

  expect(result.length).toBe(1);
  expect(result[0].name).toBe("John");
});



it("returns only 3 images when user is not logged in", () => {
  const user = getUserById("1", false);

  expect(user).not.toBeNull();
  expect(user!.images.length).toBe(3);
});


it("returns all images when user is logged in", () => {
  const user = getUserById("1", true);

  expect(user).not.toBeNull();
  expect(user!.images.length).toBe(4);
});


it("returns null for invalid user id", () => {
  const user = getUserById("999", true);

  expect(user).toBeNull();
});