import { IUser } from "../user.entity"

export type UpdateDTO = Partial<Omit<IUser, "id" | "createdAt" | "updatedAt" | "password" | "role">>;

export type CreateCoachDTO = Pick<IUser, "email" | "name" | "password">;