import { IBaseMetadata } from "../../common/repos/types";
import { IUser } from "./user.entity";
import userRepo from "./user.repo";

class UserService {
    getUsers () {
        return userRepo.findAll();
    }

    getUser(id: string) {
        return userRepo.findById(id);
    }

    getUserByEmail(email: string) {
        return userRepo.findByEmail(email);
    }

    createUser(userData: Omit<IUser, keyof IBaseMetadata | "role">) {
        return userRepo.create({...userData, role: "student"});
    }

    updateUser(id: string, newData: Partial<IUser>) {
        return userRepo.update(id, newData);
    }

    deleteUser(id: string) {
        return userRepo.delete(id);
    }
}

export default new UserService();