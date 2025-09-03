import { IBaseMetadata } from "@/common/repos/types";
import { IUser } from "./user.entity";
import userRepo from "./user.repo";
import CustomError from "@/Error/customError";
import { StatusCodes } from "@/@types";

class UserService {
    getUsers() {
        return userRepo.findAll();
    }

    getUser(id: string) {
        return userRepo.findById(id);
    }

    getUserByEmail(email: string) {
        return userRepo.findByEmail(email);
    }

    createUser(userData: Omit<IUser, keyof IBaseMetadata | "role">) {
        const isExist = this.getUserByEmail(userData.email);

        if(isExist) {

        throw new CustomError(
            'User already exist!',
            StatusCodes.HttpClientError.Conflict,
            'auth',
        );

        }
        return userRepo.create({...userData, role: "student"});
    }

    createCoach(coachData: Omit<IUser, keyof IBaseMetadata | "role">) {
        const isExist = this.getUserByEmail(coachData.email);

        if(isExist) {

            throw new CustomError(
                'User already exist!',
                StatusCodes.HttpClientError.Conflict,
                'auth',
            );
        }
        
        return userRepo.create({...coachData, role: "coach"});
    }

    updateUser(id: string, newData: Partial<IUser>) {
        return userRepo.update(id, newData);
    }

    deleteUser(id: string) {
        return userRepo.delete(id);
    }
}

export default new UserService();