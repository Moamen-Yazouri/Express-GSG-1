import express from "express";
import { userRouter } from "./Module/user/user.route";
import "dotenv/config";
const port = process.env.PORT || 4000
const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);

app.listen(port)
