import * as z from "zod";
import { IUser} from "../../Module/user/user.entity";
import { ERoles } from "../../@types/index"
export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.enum([ERoles.ADMIN, ERoles.COACH, ERoles.COACH]),
    createdAt: z.date(),
    updatedAt: z.date(),
    password: z.string(),
}) satisfies z.ZodType<IUser>
