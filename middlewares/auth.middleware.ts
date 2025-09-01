import { Request, Response, NextFunction } from "express";
import { destructToken } from "./utils/destructToken";
import { verifyToken } from "../utils/jwt.util";
import { EHttpStatus } from "../@types";
import CustomError from "../Error/customError";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if(authHeader) {

      const token = destructToken(authHeader);
      
      try {
            const tokenPayload = verifyToken(token);

            req.user = { 
              id: tokenPayload.sub, 
              role: tokenPayload.role 
            };

            next()
      }
      catch(err: unknown) {
            console.log("Wrong token!", err);
            next();
            return;
      }
  
    }
    else {
        next(
          new CustomError(
            'user is not Authenticated',
            EHttpStatus.Unauthorized,
            'auth',
          )
        )
    }
}