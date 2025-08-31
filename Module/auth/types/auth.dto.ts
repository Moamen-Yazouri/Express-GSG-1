import { IUser } from "../../user/user.entity";

export type TLoginDTO = Pick<IUser, "email" | "password">;

export type TLoginResponseDTO = Omit<IUser, "password">;

export type TSignUpDTO = Pick<IUser, "password" | "name" | "email">;

export type TSignUpResponseDTO = TLoginResponseDTO;