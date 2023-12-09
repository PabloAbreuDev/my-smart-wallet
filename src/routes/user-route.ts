import { Router } from "express";
import { UsersController } from "../controllers/users.controller";
import { confirmAccount, createUserWithEmail } from "../common/di/composition-root";

const userRouter = Router()
const userController = new UsersController(createUserWithEmail,confirmAccount)
userRouter.post('/', userController.createUser)
userRouter.get('/confirm/:verifycode', userController.confirmAccount)

export default userRouter