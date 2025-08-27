import { EHttpStatus } from "../../@types/index";
import CustomError from "../customError"
import {Response} from "express";

export const errorHandler = (err: unknown, res: Response) => {
    if(err instanceof CustomError) {
        res.status(err.statusCode).send(err.message);
        return;
    }
    res.status(EHttpStatus.InternalServerError).send("Internal Server Error!");
}