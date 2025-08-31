import { Router } from "express";
import userController from "./user.controller";

const router = Router();

router.get("/", userController.getUsers);

router.get("/:id", userController.getUser);

router.post("/", userController.creareUser);

router.delete("/:id", userController.deleteUser);

export const userRouter = router;
