import { ApiFail, ApiSuccess } from "@/@types";
import { NextFunction, Request, Response } from "express";

export const responseUnifider = (req: Request, res: Response<ApiSuccess | ApiFail>, next: NextFunction) => {
    const success = <T>(resPayload: ApiSuccess<T>) => {
        res.status(200).json(resPayload);
    }

    const created = <T>(resPayload: ApiSuccess<T>) => {
        res.status(201).json(resPayload);
    }

    const error = (resPayload: ApiFail) => {
        res.status(resPayload.statusCode).json(resPayload);
    }
    
    next();
}