import path from "node:path";
import fs from "node:fs/promises";
import CustomError from "@/Error/customError";
import { StatusCodes } from "@/@types";

export const deleteImage = async (imageName: string) => {
    try {

        const filePath = path.join(__dirname, '../', 'images', imageName);
        await fs.unlink(filePath);
    }
    catch(err: unknown) {
        throw new CustomError(
          "Failed to delete course image",
          StatusCodes.HttpServerError.InternalServerError,
          "course"
        );
    }
}