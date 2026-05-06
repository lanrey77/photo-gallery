import { Request, Response } from "express";
import * as userService from "../services/user.service.js";

export const getUsers = (req: Request, res: Response): void => {
  const { location } = req.query;

  const users = userService.getAllUsers(location as string | undefined);

  res.json(users);
};

export const getUser = (req: Request, res: Response): void => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

  const user = userService.getUserById(id, (req as any).isLoggedIn);

  if (!user) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json(user);
};
