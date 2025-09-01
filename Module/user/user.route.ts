import { Router } from "express";
import userController from "./user.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { rolesMiddleware } from "@/middlewares/roles.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", rolesMiddleware(["admin"]), userController.getUsers);

router.get("/me", userController.getCurrentUserInfo);

router.put("/me", userController.updateCurrentUser);

router.get("/:id", rolesMiddleware(["admin"]), userController.getUser);

router.post("/coach", rolesMiddleware(["admin"]), userController.createCoach);

router.delete("/:id", rolesMiddleware(["admin"]), userController.deleteUser);

export const userRouter = router;
