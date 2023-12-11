import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { environmentVariables } from '../common/environment'

export const verifyJwt = (token: string): JwtPayload | null => {
  try {
    if (!token) {
      throw new Error('Token is missing')
    }

    const decoded: any = jwt.verify(token, environmentVariables.jwt.secret)
    return decoded
  } catch (err) {
    return null
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      throw new Error('Invalid token')
    }

    const decoded: any = verifyJwt(token)

    if (!decoded) {
      throw new Error('Invalid token')
    }

    req.user = decoded.id

    next()
  } catch (err) {
    res.status(401).send('Access danied')
  }
}
