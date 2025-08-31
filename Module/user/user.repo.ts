import BaseRepo from "../../common/repos/baseRepo";
import { USERS_DATA } from "./dummy";
import { IUser } from "./user.entity";

class UserRepo extends BaseRepo<IUser> {
 
    constructor() {
        super(USERS_DATA);
    }

    findByEmail(email: string) {
        this.findBy("email", email);
    }
}

export default new UserRepo();