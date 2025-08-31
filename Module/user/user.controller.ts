import {Request, Response} from "express";
import { BodyObject, EHttpStatus } from "../../@types/index";
import userService from "./user.service";
import { IUser } from "./user.entity";
import { IBaseMetadata } from "../../common/repos/types";
class UserController {

    getUsers(req: Request, res: Response) {
        const users = userService.getUsers();

        res.status(EHttpStatus.OK).json(users);
    }

    getUser(req: Request<{id: string}>, res: Response) {
        const id = req.params.id;

        if (!id) return res.status(EHttpStatus.BadRequest).json({ error: 'ID required' });

        const user = userService.getUser(id);

        if(!user) return res.status(EHttpStatus.NotFound).json({error: "User not found!"});

        return res.status(EHttpStatus.OK).json(user);
    }

    creareUser(req: Request, res: Response) {
        const {name, email, password} = req.body;

        const newUser: Omit<IUser, keyof IBaseMetadata>  = {
            name, 
            email,
            password,
            role: "student"
        }

        return res.status(EHttpStatus.Created).json(newUser);
    }

    deleteUser(req: Request<{id: string}>, res: Response) {
        const id = req.params.id;
        userService.deleteUser(id);
        return res.status(EHttpStatus.OK).send("User deleted!");
    }

}

export default new UserController();