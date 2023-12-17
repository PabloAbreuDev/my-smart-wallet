import { Schema, Types, model } from 'mongoose'

export interface IAccount {
  name: string
  description: string
  user_id: Types.ObjectId
}

export const accountSchema = new Schema<IAccount>(
  {
    name: { type: String, required: true },
    description: { type: String },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { toJSON: { virtuals: true }, timestamps: true }
)

const Account = model<IAccount>('Account', accountSchema)

export default Account
