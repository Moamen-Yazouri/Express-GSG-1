import { TRoles } from "@/@types/index";
import { IBaseMetadata } from "@/common/repos/types";

export interface IUser extends IBaseMetadata {
    name: string;
    email: string;
    password: string;
    role: TRoles;
}