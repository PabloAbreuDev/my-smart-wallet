import { Router } from 'express'
import { UsersController } from '../controllers/users.controller'
import {
  confirmUserAccount,
  createUserWithEmail,
  loginUseCase
} from '../common/di/composition-root'
import { validateRequest } from '../middleware/zod-validator'
import { createUserWithEmailRequestSchema } from './schemas/create-user'

const userRouter = Router()
const userController = new UsersController(
  createUserWithEmail,
  confirmUserAccount,
  loginUseCase
)
userRouter.post(
  '/',
  validateRequest(createUserWithEmailRequestSchema),
  userController.createUser
)
userRouter.get('/confirm/:verifycode', userController.confirmUserAccount)
userRouter.post('/login', userController.login)

export default userRouter
