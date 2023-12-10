import { Router } from "express";
import { UsersController } from "../controllers/users.controller";
import { confirmAccount, createDepot, createUserWithEmail } from "../common/di/composition-root";
import { validateRequest } from "../middleware/zod-validator";
import { createUserWithEmailRequestSchema } from "./schemas/create-user";

const userRouter = Router()
const userController = new UsersController(createUserWithEmail,confirmAccount,createDepot)
userRouter.post('/', validateRequest(createUserWithEmailRequestSchema), userController.createUser)
userRouter.get('/confirm/:verifycode', userController.confirmAccount)

export default userRouter