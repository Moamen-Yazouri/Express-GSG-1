import { Response, Request } from "express";
import { BodyObject, StatusCodes } from "@/@types";
import {
  TLoginDTO,
  TLoginResponseDTO,
  TSignUpDTO,
  TSignUpResponseDTO,
} from "./types/auth.dto";
import { zodValidation } from "@/validation/utils/zodValidation";
import { signInSchema, signUpSchema } from "@/validation/schemas/auth.schema";
import authService from "./auth.service";
import userService from "@/Module/user/user.service";
import { createArgon2Hash } from "@/utils/hash.util";
import { removeKey } from "@/utils/object.utils";
import CustomError from "@/Error/customError";

class AuthController {
  async signIn(
    req: Request<BodyObject, BodyObject, TLoginDTO>,
    res: Response
  ) {
    const userCreds = req.body;

    const validData = zodValidation(signInSchema, userCreds, "auth");
    
    const loginData: TLoginResponseDTO | null = await authService.signIn(validData);
    
    if (!loginData) {

        throw new CustomError(
          'Invalid credentials!',
          StatusCodes.HttpClientError.BadRequest,
          'auth',
        )
      
    }

    return res.success({

      success: true,
      data: loginData,
      statusCode: StatusCodes.HttpSuccess.OK,
      message: "Signed in successfully",

    });
  }

  async signUp(
    req: Request<BodyObject, BodyObject, TSignUpDTO>,
    res: Response
  ) {

      const userData = req.body;

      const validData = zodValidation(
        signUpSchema,
        { ...userData },
        "auth"
      );

    const hashedPassword = await createArgon2Hash(userData.password);

    const registeredUser = userService.createUser({...validData, password: hashedPassword});

    const userForTrans: TSignUpResponseDTO = removeKey(registeredUser, ["password"]);

    return res.success({

      success: true,
      data: userForTrans,
      statusCode: StatusCodes.HttpSuccess.Created,
      message: "Signed up successfully",
      
    });
  }
}

export default new AuthController();
