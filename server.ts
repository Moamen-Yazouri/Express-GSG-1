import "dotenv/config";
import express, { NextFunction } from "express";
import { userRouter } from "./Module/user/user.route";
import {Request, Response} from "express";
import { errorHandler } from "./Error/utils/errorHandler";
import { authRouter } from "@/Module/auth/auth.route";
import CourseRouter from "./Module/course/courses.route";
import { responseUnifider } from "./middlewares/responseUnifider.middleware";
const port = process.env.PORT;
const app = express();

app.use(express.json());

app.use(responseUnifider);

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/users", userRouter);

app.use('/api/v1/course', CourseRouter);

app.use((req: Request, res: Response) => {
    const path = req.path
    res.status(404).json({message: `route not found: ${path}`});
})

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    errorHandler(err, res);
});

app.listen(port);