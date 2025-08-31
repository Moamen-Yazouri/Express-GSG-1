import { IUser } from "./user.entity";

export const USERS_DATA: IUser[] = [
        {
            id: "u1",
            name: "Alice Admin",
            email: "alice.admin@example.com",
            password: "hashedpassword1",
            role: "admin",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "u2",
            name: "Bob Coach",
            email: "bob.coach@example.com",
            password: "hashedpassword2",
            role: "coach",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "u3",
            name: "Charlie Student",
            email: "charlie.student@example.com",
            password: "hashedpassword3",
            role: "student",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ] as const;