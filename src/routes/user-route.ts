import { Router } from "express";
import { UsersController } from "../controllers/users.controller";
import { createUserWithEmail } from "../config/di/composition-root";

const userRouter = Router()
const userController = new UsersController(createUserWithEmail)
userRouter.post('/', userController.createUser)

export default userRouter