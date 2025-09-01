import { EHttpStatus, TJwtPayload } from "@/@types";
import CustomError from "@/Error/customError";
import { createArgon2Hash, verifyArgon2Hash } from "@/utils/hash.util";
import { generateToken } from "@/utils/jwt.util";
import { removeKey } from "@/utils/object.utils";
import userService from "@/Module/user/user.service";
import { TLoginDTO, TSignUpDTO } from "./types/auth.dto";

class AuthService {

    async signIn(userCreds: TLoginDTO) {
        try {
        const user = userService.getUserByEmail(userCreds.email);
        if(!user) return null;
        const isValid = await verifyArgon2Hash(userCreds.password, user.password);
        
        if(!isValid) return null;
        const tokenPayload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        } as TJwtPayload
        
        const token = generateToken(tokenPayload)
        const userForTrans = removeKey(user, ["password"]);
        return {user: userForTrans, token};
        }
        catch(err: unknown) {
            if(err instanceof Error)
                throw new CustomError(err.message, EHttpStatus.BadRequest, "auth");
            else 
                throw new CustomError("Internal server error", EHttpStatus.InternalServerError, "auth");
        }

    }

    async signUp (userData: TSignUpDTO) {
        try {

            const hashedPass = await createArgon2Hash(userData.password);

            const newUserData = {
                ...userData,
                password: hashedPass,
            };

            const createdUser = userService.createUser(newUserData);
 
            return removeKey(createdUser, ["password"]);

        }
        catch(err: unknown) {
              if(err instanceof Error)
                throw new CustomError(err.message, EHttpStatus.BadRequest, "auth",);
            else 
                throw new CustomError("Internal server error", EHttpStatus.InternalServerError, "auth");
        }
    } 
}

export default new AuthService();