import { Request, Response, NextFunction } from "express";
import { destructToken } from "./utils/destructToken";
import { verifyToken } from "../utils/jwt.util";
import { EHttpStatus } from "../@types";
import CustomError from "../Error/customError";

export const authenticationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if(authHeader) {

      const token = destructToken(authHeader);
      
      try {
            const tokenPayload = verifyToken(token);
            console.log(tokenPayload);
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