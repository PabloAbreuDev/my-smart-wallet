import { Request, Router, Response } from 'express'
import { UsersController } from '../controllers/users.controller'
import {
  changePasswordUseCase,
  confirmUserAccount,
  createUserWithEmail,
  forgotPasswordUseCase,
  usersController
} from '../common/di/composition-root'
import { validateRequest } from '../middleware/zod-validator'
import { createUserWithEmailRequestSchema } from './schemas/create-user'
import passport from 'passport'
import { isAuthenticated } from '../loaders/passport'
import { forgotPasswordRequestSchema } from './schemas/forgot-password'
import { changePasswordRequestSchema } from './schemas/change-password'

const userRouter = Router()

userRouter.post(
  '/',
  validateRequest(createUserWithEmailRequestSchema),
  usersController.createUser
)
userRouter.get('/confirm/:verifycode', usersController.confirmUserAccount)

userRouter.get(
  '/login/google/callback',
  passport.authenticate('google'),
  (req: Request, res: Response) => {
    res.redirect('http://localhost:3001/login-success')
  }
)

userRouter.get(
  '/login/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

userRouter.post(
  '/login/local',
  passport.authenticate('local'),
  (req: Request, res: Response) => {
    res.send('Logged in Succefully')
  }
)

userRouter.get('/me', isAuthenticated, usersController.me)

userRouter.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

userRouter.post(
  '/forgot-password',
  validateRequest(forgotPasswordRequestSchema),
  usersController.forgot
)

userRouter.patch(
  '/change-password',
  validateRequest(changePasswordRequestSchema),
  usersController.changePassword
)

export default userRouter
