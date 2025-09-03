import * as z from "zod";
import { ICourse} from "@/Module/course/course.entity";

export const courseSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
}) satisfies z.ZodType<ICourse>;


export const createCourseSchema = courseSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const updateCourseSchema = courseSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
}).partial();
