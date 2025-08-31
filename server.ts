import express, { NextFunction } from "express";
import { userRouter } from "./Module/user/user.route";
import {Request, Response} from "express";
import "dotenv/config";
import { errorHandler } from "./Error/utils/errorHandler";
const port = process.env.PORT || 4000
const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);

app.listen(port);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, res);
});
