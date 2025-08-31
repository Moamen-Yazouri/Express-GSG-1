import { Router } from "express";
import userController from "./user.controller";
import { authenticationMiddleware } from "@/middlewares/authentication.middleware";

const router = Router();

router.use(authenticationMiddleware);

router.get("/", userController.getUsers);

router.get("/:id", userController.getUser);

router.post("/", userController.creareUser);

router.delete("/:id", userController.deleteUser);

export const userRouter = router;
