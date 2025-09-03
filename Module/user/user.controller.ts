import { Request, Response } from "express";
import { BodyObject, StatusCodes } from "@/@types/index";
import { IBaseMetadata } from "@/common/repos/types";
import { removeKey } from "@/utils/object.utils";
import { createArgon2Hash } from "@/utils/hash.util";
import CustomError from "@/Error/customError";
import userService from "../user/user.service";
import { IUser } from "../user/user.entity";
import { zodValidation } from "@/validation/utils/zodValidation";
import { createSchema, updateSchema } from "@/validation/schemas/user.schema";
import { CreateCoachDTO, UpdateDTO } from "./types/user.dto";

class UserController {
  getUsers(req: Request, res: Response) {
    const users = userService.getUsers();

    return res.success({
      success: true,
      data: users,
      statusCode: StatusCodes.HttpSuccess.OK,
      message: "Users retrieved successfully",
    });
  }

  getCurrentUserInfo(req: Request, res: Response) {
    const id = req.user?.id;

    if (!id) {
      throw new CustomError(
        "Unauthorized!",
        StatusCodes.HttpClientError.Unauthorized,
        "user"
      );
    }

    const currentInfo = userService.getUser(id);

    if (!currentInfo) {

      throw new CustomError(
        "User not found!",
        StatusCodes.HttpClientError.NotFound, 
        "user"
      );

    }

    return res.success({
      success: true,
      data: currentInfo,
      statusCode: StatusCodes.HttpSuccess.OK,
      message: "User info retrieved successfully",
    });
  }

  getUser(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id;

    if (!id) {
      throw new CustomError(
        "ID required!",
        StatusCodes.HttpClientError.BadRequest, 
        "user"
      );
    }

    const user = userService.getUser(id);

    if (!user) {
      throw new CustomError(
        "User not found!",
        StatusCodes.HttpClientError.NotFound, 
        "user"
      );
    }

    return res.success({
      success: true,
      data: user,
      statusCode: StatusCodes.HttpSuccess.OK,
      message: "User info retrieved successfully",
    });
  }

  async createCoach(req: Request<BodyObject, BodyObject, CreateCoachDTO>, res: Response) {
    const coachData = req.body;

    const validData = zodValidation(createSchema, req.body, "user");
    
    const hashedPass = await createArgon2Hash(coachData.password);

    const newUser: Omit<IUser, keyof IBaseMetadata | "role"> = {
      ...validData,
      password: hashedPass,
    };

    const createdCoach = userService.createCoach(newUser);

    return res.success({
      success: true,
      data: removeKey(createdCoach, ["password"]),
      statusCode: StatusCodes.HttpSuccess.Created, 
      message: "Coach created successfully",
    });

  };

  deleteUser(req: Request<{ id: string }>, res: Response) {

    const id = req.params.id;

    if (!id) {

      throw new CustomError(
        "ID required!",
        StatusCodes.HttpClientError.BadRequest, 
        "user"
      );

    }

    
    const isDeleted = userService.deleteUser(id);

    if(!isDeleted) {

        throw new CustomError(
            "You are trying to delete a user that does not exist!",
            StatusCodes.HttpClientError.NotFound, 
            "user"
        );
        
    }

    return res.success({
      success: true,
      data: { id },
      statusCode: StatusCodes.HttpSuccess.OK,
      message: "User deleted!",
    });

  }

  updateCurrentUser(
    
    req: Request<BodyObject, BodyObject, UpdateDTO>,

    res: Response

  ) {
    const id = req.user?.id;

    if (!id) {

      throw new CustomError(
        "Unauthorized!",
        StatusCodes.HttpClientError.Unauthorized, 
        "user"
      );

    }
    const newData = req.body;

    const validData = zodValidation(updateSchema, newData, "user");
    
    const updatedUser = userService.updateUser(id, validData);

    if (!updatedUser) {

      throw new CustomError(
        "User not found!",
        StatusCodes.HttpClientError.NotFound, 
        "user"
      );

    }

    return res.success({
      success: true,
      data: updatedUser,
      statusCode: StatusCodes.HttpSuccess.OK,
      message: "User updated successfully",
    });

  }
}

export default new UserController();
