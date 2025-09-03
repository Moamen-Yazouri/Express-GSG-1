import { ZodError, ZodType } from "zod";
import { StatusCodes, TModule } from "@/@types";
import CustomError from "@/Error/customError";

export const zodValidation = <T>(schema: ZodType<T>, data: T, moduleName: TModule) => {
    try {
        const validData = schema.parse(data);
        return validData;
    }
    catch(err: unknown) {

        if(err instanceof ZodError) {

            
            throw new CustomError(
                err.message,
                StatusCodes.HttpClientError.BadRequest,
                moduleName,
            )

        }

        if(err instanceof CustomError) {
            
            throw new CustomError(
                err.message,
                StatusCodes.HttpClientError.BadRequest,
                moduleName,
            )

        }

        else {

            throw new CustomError(
                "Internal Server Error",
                StatusCodes.HttpServerError.InternalServerError,
                moduleName,
            )
            
        }
    }
}