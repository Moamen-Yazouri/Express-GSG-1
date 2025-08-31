import { BodyObject, EHttpStatus } from "@/@types";
import {Response, Request} from "express";
import { TLoginDTO, TLoginResponseDTO, TSignUpDTO, TSignUpResponseDTO } from "./auth.dto";
import { zodValidation } from "@/validation/utils/zodValidation";
import { signInSchema, signUpSchema } from "@/validation/schemas/auth.schema";
import authService from "./auth.service";
import userService from "@/Module/user/user.service";
import { createArgon2Hash } from "@/utils/hash.util";
import { removeKey } from "@/utils/object.utils";

class AuthController {
    async signIn(req: Request<BodyObject, BodyObject, TLoginDTO>, res: Response<TLoginResponseDTO | string>) {
        const userCreds = req.body;
        const validData = zodValidation(signInSchema, userCreds, "auth");
        const loginData = await authService.signIn(validData);

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

    async signUp (req: Request<BodyObject, BodyObject, TSignUpDTO>, res: Response<TSignUpResponseDTO>) {

        const userData = req.body;

        const hashedPassword = await createArgon2Hash(userData.password);

        const validData = zodValidation(
            signUpSchema,
            {
                ...userData, 
                password: hashedPassword
            },
             "auth"
        );

        const registeredUser = userService.createUser(validData);

        const userForTrans = removeKey(registeredUser, ["password"]);

        res
            .status(EHttpStatus.Created)
            .json(userForTrans)
        
    }
}

export default new AuthController();