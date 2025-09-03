import { StatusCodes, TRoles } from "@/@types";

import CustomError from "@/Error/customError";

import { NextFunction, Request, Response  } from "express";


export const rolesMiddleware = (allowed: TRoles[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req.user?.role;
        if(!role) {

           throw new CustomError(
            'user is not authorized',
            StatusCodes.HttpClientError.Unauthorized,
            'auth',
          );

        }

        if(!allowed.includes(role)) {

            throw new CustomError(
                'You do not have sufficient permissions to access this route!',
                StatusCodes.HttpClientError.Forbidden,
                'auth',
            )

            }
        else {
            next();
            return;
        }
        
    }
}