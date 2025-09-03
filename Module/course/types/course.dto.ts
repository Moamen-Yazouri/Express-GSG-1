import { IBaseMetadata } from "@/common/repos/types";
import { ICourse } from "../course.entity";

export type CreatCourseDTO = Omit<ICourse, keyof IBaseMetadata>;

export type UpdateCourseDTO = Omit<Partial<ICourse>, keyof IBaseMetadata>;