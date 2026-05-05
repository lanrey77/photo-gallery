import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", userController.getUsers);
router.get("/:id", auth, userController.getUser);

export default router;