import { StatusCodes } from "@/@types";
import CustomError from "@/Error/customError";
import multer from "multer";
import path from "node:path";

const imagesPath = path.join(__dirname, "../images");

const fileUpload = multer({
    storage: multer.diskStorage({

        destination: (_req, _file, cb) => {
            cb(null, imagesPath);
        },

        filename: (_req, file, cb) => {
            const ext = path.extname(file.originalname);
            const fileName = `${Date.now()}${ext}`;
            cb(null, fileName);
        }

    }),

    limits: {
        fileSize: 1024 * 1024 * 5
    },

    fileFilter: (req, file, cb) => {
        if(file.mimetype.startsWith("image")) {
            cb(null, true);
        }
        else {

            cb(new CustomError("File type not supported", StatusCodes.HttpClientError.BadRequest, "course"));

        }

    }  
});

export const uploadSingle = (fieldName: string) => fileUpload.single(fieldName);