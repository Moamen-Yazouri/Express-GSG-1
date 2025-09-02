import {Request, Response} from "express";
import { BodyObject, EHttpStatus, StatusCodes } from "@/@types/index";
import userService from "./user.service";
import { IUser } from "./user.entity";
import { IBaseMetadata } from "@/common/repos/types";
import { removeKey } from "@/utils/object.utils";
import { createArgon2Hash } from "@/utils/hash.util";

class UserController {

    getUsers(req: Request, res: Response) {
        const users = userService.getUsers();
        
        res.status(EHttpStatus.OK).json(users);
    }

    getCurrentUserInfo(req: Request, res: Response) {

        const id = req.user?.id;

        if(!id) return res.status(EHttpStatus.Unauthorized).json({error: "Unauthorized!"});

        const currentInfo = userService.getUser(id);

        if(!currentInfo) return res.status(EHttpStatus.NotFound).json({error: "User not found!"});

        return res.status(StatusCodes.HttpSuccess.OK).success({
            success: true,
            data: currentInfo,
            statusCode: StatusCodes.HttpSuccess.OK,
            message: "User info retrieved successfully",
        });
    }

    getUser(req: Request<{id: string}>, res: Response) {
        const id = req.params.id;

        if (!id) return res.status(EHttpStatus.BadRequest).json({ error: 'ID required' });

        const user = userService.getUser(id);

        if(!user) return res.status(EHttpStatus.NotFound).json({error: "User not found!"});

        return res.status(EHttpStatus.OK).json(user);
    }

    // createUser(req: Request, res: Response) {
    //     const {name, email, password} = req.body;

    //     const newUser: Omit<IUser, keyof IBaseMetadata>  = {
    //         name, 
    //         email,
    //         password,
    //         role: "student"
    //     }

    //     return res.status(EHttpStatus.Created).json(newUser);
    // }

    async createCoach(req: Request, res: Response) {
        const {name, email, password} = req.body;
        const hashedPass = await createArgon2Hash(password);
        const newUser: Omit<IUser, keyof IBaseMetadata | "role">  = {
            name, 
            email,
            password: hashedPass,
        }

        const createdCoach = userService.createCoach(newUser);
        return res.status(EHttpStatus.Created).json(removeKey(createdCoach, ["password"]));
    }

    deleteUser(req: Request<{id: string}>, res: Response) {
        const id = req.params.id;
        userService.deleteUser(id);
        return res.status(EHttpStatus.OK).send("User deleted!");
    }

    updateCurrentUser(req: Request<BodyObject, BodyObject, Partial<IUser>>, res: Response) {
        const id = req.user?.id;
        
        if(!id) return res.status(EHttpStatus.Unauthorized).json({error: "Unauthorized!"});

        const newData = req.body;

        const updatedUser = userService.updateUser(id, newData);
        
        return res.status(EHttpStatus.OK).json(updatedUser);
    }

}

export default new UserController();