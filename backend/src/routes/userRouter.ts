import { Router } from "express";
import { addUser, login } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/create/user", addUser);
userRouter.get("/login/user", login);

export default userRouter;
