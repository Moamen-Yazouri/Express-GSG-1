import { ApiFail, ApiSuccess } from "@/@types";
import { NextFunction, Request, RequestHandler, Response } from "express";

export const responseUnifider: RequestHandler = (req: Request, res: Response<ApiSuccess | ApiFail>, next: NextFunction) => {
    
    res.success = <T>(resPayload: ApiSuccess<T>) => {
        res
            .status(200)
            .json(resPayload);
    }

    res.created = <T>(resPayload: ApiSuccess<T>) => {
        res
            .status(201)
            .json(resPayload);
    }

    res.error = (resPayload: ApiFail) => {
        res
            .status(resPayload.statusCode)
            .json(resPayload);
    }
    
    next();
}