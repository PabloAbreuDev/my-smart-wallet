import { Request, Router, Response } from 'express'
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
userRouter.get('/confirm/:verifycode', userController.confirmUserAccount)

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

userRouter.get('/me', isAuthenticated, userController.me)

userRouter.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

export default userRouter
