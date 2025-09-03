import { Request, Response, NextFunction } from "express";
import { destructToken } from "./utils/destructToken";
import { verifyToken } from "../utils/jwt.util";
import { StatusCodes } from "../@types";
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
          throw new CustomError(
            'user is not authorized',
            StatusCodes.HttpClientError.Unauthorized,
            'auth',
          )
      }
  
    }
    else {

      throw new CustomError(
        'user is not authorized',
        StatusCodes.HttpClientError.Unauthorized,
        'auth',
      );
      
    }
}