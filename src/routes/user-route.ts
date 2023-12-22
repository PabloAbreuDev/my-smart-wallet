import { Router } from 'express'
import { UsersController } from '../controllers/users.controller'
import {
  confirmUserAccount,
  createUserWithEmail
} from '../common/di/composition-root'
import { validateRequest } from '../middleware/zod-validator'
import { createUserWithEmailRequestSchema } from './schemas/create-user'
import passport from 'passport'
import { isAuthenticated } from '../loaders/passport'

const userRouter = Router()
const userController = new UsersController(
  createUserWithEmail,
  confirmUserAccount
)
userRouter.post(
  '/',
  validateRequest(createUserWithEmailRequestSchema),
  userController.createUser
)
userRouter.get(
  '/confirm/:verifycode',
  isAuthenticated,
  userController.confirmUserAccount
)
userRouter.post('/login', passport.authenticate('local'))

export default userRouter
