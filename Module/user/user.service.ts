import { IBaseMetadata } from "@/common/repos/types";
import { IUser } from "./user.entity";
import userRepo from "./user.repo";
import CustomError from "@/Error/customError";
import { StatusCodes } from "@/@types";
import { CreateCoachDTO, UpdateDTO } from "./types/user.dto";

class UserService {

    isExist(id: IUser["id"]) {

        return Boolean(userRepo.findById(id));

    }

    isDuplicated(email: IUser["email"]) {

        const isExist = this.getUserByEmail(email);

        return Boolean(isExist);

    }

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
        const isExist = this.isExist(userData.email);

        if(isExist) {

        throw new CustomError(
            'User already exist!',
            StatusCodes.HttpClientError.Conflict,
            'auth',
        );

        }
        return userRepo.create({...userData, role: "student"});
    }

    createCoach(coachData: CreateCoachDTO) {
        
        const isExist = this.isExist(coachData.email);

        if(isExist) {

            throw new CustomError(
                'User already exist!',
                StatusCodes.HttpClientError.Conflict,
                'auth',
            );
        }
        
        return userRepo.create({...coachData, role: "coach"});
    }

    updateUser(id: string, newData: UpdateDTO) {
        const isExist = this.isExist(id);

        if(!isExist) {
            throw new CustomError(
                'User not found',
                StatusCodes.HttpClientError.NotFound,
                'user',
            )
        }

        if(newData.email) {

            const isDuplicate = this.isDuplicated(newData.email);

            if(isDuplicate) {
                throw new CustomError(
                    'Email already exist!',
                    StatusCodes.HttpClientError.Conflict,
                    'auth',
                );
            }
        }

        return userRepo.update(id, newData);

    }

    deleteUser(id: string) {
        return userRepo.delete(id);
    }
}

export default new UserService();