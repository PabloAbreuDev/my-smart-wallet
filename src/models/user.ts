import { Schema, model, Document, MongooseError } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  password: string
  verifyCode: string
  verified: boolean
  currentProvider: 'GOOGLE' | 'LOCAL'
  googleProvider: {
    id: string
    email: string
  }
  localProvider: {
    id: string
    email: string
  }
}

export const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, minlength: 3 },
    lastName: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    verifyCode: { type: String },
    verified: { type: Boolean, default: false },
    currentProvider: {
      type: String,
      enum: ['GOOGLE', 'LOCAL'],
      required: true
    },
    googleProvider: {
      id: { type: String },
      email: { type: String }
    },
    localProvider: {
      id: { type: String },
      email: { type: String }
    }
  },
  { toJSON: { virtuals: true }, timestamps: true }
)

userSchema.pre<IUser>('save', async function (next) {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }

  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password, salt)
    user.password = hashedPassword
    next()
  } catch (error) {
    next(error as MongooseError | undefined)
  }
})

const User = model<IUser>('User', userSchema)

export default User
