import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  isLoggedIn?: boolean;
}

export const auth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  req.isLoggedIn = !!req.headers["x-user"];
  next();
};