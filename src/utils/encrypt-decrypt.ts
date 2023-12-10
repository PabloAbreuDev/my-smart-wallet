import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { environmentVariables } from '../common/environment'

export const generateUUID = (): string => uuidv4()

export const compareHash = async (
  data: string,
  hash: string
): Promise<boolean> => {
  try {
    const result = await bcrypt.compare(data, hash)
    return result
  } catch (error) {
    console.error('Error comparing hashes:', error)
    return false
  }
}

export const generateJwtToken = (payload: any): string => {
  try {
    const token = jwt.sign(payload, environmentVariables.jwt.secret, {
      expiresIn: environmentVariables.jwt.expiresIn
    })

    return token
  } catch (error) {
    console.error('Error generating token:', error)
    throw new Error('Error generating token')
  }
}
