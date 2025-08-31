import { IUser } from "../../user/user.entity";

export type TLoginDTO = Pick<IUser, "email" | "password">;

export type TLoginResponseDTO = {user: Omit<IUser, "password">, token: string};

export type TSignUpDTO = Pick<IUser, "password" | "name" | "email">;

export type TSignUpResponseDTO = TLoginResponseDTO;