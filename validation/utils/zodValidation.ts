import { ZodError, ZodType } from "zod";
import { EHttpStatus, TModule } from "../../@types";
import CustomError from "../../Error/customError";

export const zodValidation = <T>(schema: ZodType<T>, data: T, moduleName: TModule) => {
    try {
        const validData = schema.parse(data);
        return validData;
    }
    catch(err: unknown) {
        if(err instanceof ZodError) {
            console.log(err);
            throw new CustomError(
                err.message,
                EHttpStatus.BadRequest,
                moduleName,
            )
        }
        if(err instanceof CustomError) {
            console.log(err);
            throw new CustomError(
                err.message,
                EHttpStatus.BadRequest,
                moduleName,
            )
        }
        else {
            console.log(err);
            throw new CustomError(
                "Internal Server Error",
                EHttpStatus.InternalServerError,
                moduleName,
            )
        }
    }
}