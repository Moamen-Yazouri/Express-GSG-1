import CustomError from "@/Error/customError";
import { IUser } from "@/Module/user/user.entity";

enum EModules {
    AUTH = 'auth',
    USER = 'user',
    COURSE = 'course',
}
export enum ERoles {
  ADMIN = 'admin',
  COACH = 'coach',
  STUDENT = 'student'
}

export type TRoles = `${ERoles}`;
export type TModule = `${EModules}`;  


export enum EHttpStatus {
  
  OK = 200,
  Created = 201,
  NoContent = 204,

  MovedPermanently = 301,
  Found = 302,
  NotModified = 304,

  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,

  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
}

export namespace StatusCodes {
  export enum HttpSuccess {
    OK = 200,
    Created = 201,
    NoContent = 204,
  }

  export enum HttpClientError {
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 409,
  }

export enum HttpServerError {
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
}
}


type StatusCodes = typeof EHttpStatus[keyof typeof EHttpStatus];

export type BodyObject = Record<string, unknown>;

export type TJwtPayload = Pick<IUser, "email" | "name" | "role"> & { sub: string };  

interface IEnv {
  PORT: number,
  JWT_SECRET: string,
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IEnv {}
  }
}

export interface ApiSuccess<T = unknown> {
  success: true,
  data: T,
  statusCode: StatusCodes.HttpSuccess,
  message?: string,
}

export interface ApiFail {
  success: false,
  statusCode: StatusCodes.HttpClientError | StatusCodes.HttpServerError,
  message: string,
}
declare global {
  namespace Express {

    interface Request {
      user?: {
        id: string;
        role?: "admin" | "coach" | "student";
      };
    }

    interface Response {
      success: <T>(resPayload: ApiSuccess<T>) => this,
      created: <T>(resPayload: ApiSuccess<T>) => this,
      error: (resPayload: ApiFail) => this,
    }
  }
}
