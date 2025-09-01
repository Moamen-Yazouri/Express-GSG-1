import "dotenv/config";
import express, { NextFunction } from "express";
import { userRouter } from "./Module/user/user.route";
import {Request, Response} from "express";
import { errorHandler } from "./Error/utils/errorHandler";
import { authRouter } from "@/Module/auth/auth.route";
import CourseRouter from "./Module/course/courses.route";
const port = process.env.PORT;
const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use('/api/v1/course', CourseRouter);
app.listen(port);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    errorHandler(err, res);
});
