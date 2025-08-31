import { verifyArgon2Hash } from "../../../utils/hash.util";
import userService from "../../user/user.service";
import { TLoginDTO, TSignUpDTO } from "./auth.dto";

class AuthService {
    async login(userCreds: TLoginDTO) {
        const user = userService.getUserByEmail(userCreds.email);

        if(!user) return null;

        const isValid = await verifyArgon2Hash(userCreds.password, user.password);

        if(!isValid) return null;

        return user;
    }

    async signUp (userData: TSignUpDTO) {
        
    } 
}