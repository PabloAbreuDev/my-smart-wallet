import { Schema, Types, model } from 'mongoose'
import { generateUUID } from '../utils/encrypt-decrypt'

export interface IChangePassword extends Document {
  user_id: Types.ObjectId
  active: boolean
  code: string
}

const changePasswordSchema = new Schema<IChangePassword>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    active: { type: Boolean, default: true },
    code: { type: String, required: true, default: () => generateUUID() }
  },
  { toJSON: { virtuals: true }, timestamps: true }
)

const ChangePassword = model<IChangePassword>(
  'ChangePassword',
  changePasswordSchema
)

export default ChangePassword
