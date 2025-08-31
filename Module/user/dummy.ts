import { IUser } from "./user.entity";

export const USERS_DATA: IUser[] = [
        {
            id: "u1",
            name: "Admin",
            email: "admin@no.com",
            password: "$argon2id$v=19$m=65536,t=3,p=4$pXk4zlWtxEaZf6faPOMQOw$JeSa2uVI2pi2pv6SCsy2OGvBhIEZXugG7RGngugcA60",
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