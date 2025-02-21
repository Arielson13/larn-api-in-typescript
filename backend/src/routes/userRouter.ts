import { Router } from "express";
import { addUser } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/create/user", addUser);

export default userRouter;
