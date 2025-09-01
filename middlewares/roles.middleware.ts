import { EHttpStatus, TRoles } from "@/@types";
import CustomError from "@/Error/customError";
import { NextFunction, Request, Response  } from "express";
import { destructToken } from "./utils/destructToken";
import { verifyToken } from "@/utils/jwt.util";

export const rolesMiddleware = (allowed: TRoles[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req.user?.role;
        if(!role) {
            res
                .status(EHttpStatus.Unauthorized)
                .json({error: "Unauthorized!"});

            return;
        }
        if(!allowed.includes(role)) {
            next(
                new CustomError(
                    'user is not authorized',
                    EHttpStatus.Forbidden,
                    'auth',
                )
            )
            return;
            }
        else {
            next();
            return;
        }
        
    }
}