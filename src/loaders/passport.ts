import * as localStrategy from 'passport-local'
import * as googleStrategy from 'passport-google-oauth2'
import { Express, NextFunction, Request, Response } from 'express'
import passport, { Profile } from 'passport'
import User, { IUser } from '../models/user'
import { compareHash } from '../utils/encrypt-decrypt'
import { createUserWithGoogleUseCase } from '../common/di/composition-root'
import { environmentVariables } from '../common/environment'

export async function initPassport(app: Express) {
  app.use(passport.initialize())
  app.use(passport.authenticate('session'))

  passport.use(
    new localStrategy.Strategy(
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

  passport.use(
    new googleStrategy.Strategy(
      {
        clientID: environmentVariables.google.clienteID,
        clientSecret: environmentVariables.google.clienteSecret,
        callbackURL: `${environmentVariables.api.baseUrl}/users/login/google/callback`,
        passReqToCallback: true
      },
      async (
        request: any,
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: any
      ) => {
        try {
          if (!profile.emails || profile.emails.length === 0) {
            return done(null, false)
          }

          const user = await User.findOne({ 'googleProvider.id': profile.id })

          if (user) {
            return done(null, user)
          }

          const newUser = await createUserWithGoogleUseCase.execute({
            firstName: profile.name?.givenName || '',
            lastName: profile.name?.familyName || '',
            email: profile.emails[0].value,
            googleId: profile.id
          })

          if (!newUser) {
            return done(null, false)
          }

          return done(null, newUser)
        } catch (err) {
          return done(err)
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
  if (req.user) {
    return next()
  } else {
    return res.status(401).json({ message: 'User not authenticated' })
  }
}
