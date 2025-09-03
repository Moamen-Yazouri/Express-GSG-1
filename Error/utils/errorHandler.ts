import { StatusCodes } from "@/@types/index";
import CustomError from "../customError";
import { Response } from "express";

export const errorHandler = (err: unknown, res: Response) => {

  if (err instanceof CustomError) {

    return res.error({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
    });

  }

  return res.error({
    success: false,
    statusCode: StatusCodes.HttpServerError.InternalServerError,
    message: "Internal Server Error!",
  });

};
