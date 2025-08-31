import { ZodType } from "zod"
import { userSchema } from "./user.schema"
import { TLoginDTO, TSignUpDTO } from "@/Module/auth/types/auth.dto"

export const signUpSchema = userSchema.pick({
    password: true,  
    name: true,  
    email: true, 
}) satisfies ZodType<TSignUpDTO>


export const signInSchema = userSchema.pick({
    email: true, 
    password: true,  
}) satisfies ZodType<TLoginDTO>