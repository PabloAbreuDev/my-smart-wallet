import * as passportStrategy from 'passport-local'
import { Express, NextFunction, Request, Response } from 'express'
import passport from 'passport'
import User, { IUser } from '../models/user'
import { compareHash } from '../utils/encrypt-decrypt'

export async function initPassport(app: Express) {
  app.use(passport.initialize())
  app.use(passport.authenticate('session'))

  passport.use(
    new passportStrategy.Strategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        try {
          if (!email) {
            done(null, false)
          }
          const user = await User.findOne({ email }).select('password')
          if (!user) {
            return done(null, false, { message: 'User or password incorrect' })
          }
          const isValid = await compareHash(password, user.password)

          if (!isValid) {
            done(null, false, { message: 'User or password incorrect' })
          }

          done(null, user)
        } catch (e) {
          done(e)
        }
      }
    )
  )

  passport.serializeUser((user: Partial<IUser>, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id: string, done) => {
    const user = await User.findById(id)
    done(null, { id: user?._id.toString() })
  })
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (req.user) return next()
  else res.redirect('/')
}
