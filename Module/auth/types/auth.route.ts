import { RequestHandler, Router } from "express";
import authController from "./auth.controller";

const router = Router();

router.post("/sign-in", authController.signIn as RequestHandler);

router.post("/sign-up", authController.signUp);

export const authRouter = router;