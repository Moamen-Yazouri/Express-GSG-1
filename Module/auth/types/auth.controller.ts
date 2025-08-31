import { BodyObject, EHttpStatus } from "../../../@types";
import {Response, Request} from "express";
import { TLoginDTO, TLoginResponseDTO } from "./auth.dto";
import { zodValidation } from "../../../validation/utils/zodValidation";
import { loginSchema } from "../../../validation/schemas/auth.schema";
import authService from "./auth.service";

class AuthController {
    async login(req: Request<BodyObject, BodyObject, TLoginDTO>, res: Response<TLoginResponseDTO | string>) {
        const userCreds = req.body;
        const validData = zodValidation(loginSchema, userCreds, "auth");
        const loginData = await authService.login(validData);

        if(!loginData) {
            res
                .status(EHttpStatus.BadRequest)
                .send("Invalid Credintials!");
            return;
        }

        res
            .status(EHttpStatus.OK)
            .json(loginData)
    }
}

export default new AuthController();