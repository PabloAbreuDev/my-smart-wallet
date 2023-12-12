import { Schema, Types, model } from 'mongoose'

export interface IFinancialMovement extends Document {
  user_id: Types.ObjectId
  description: string
  amount: number
  type: 'income' | 'expense' | 'transfer'
  source?: Types.ObjectId
  destination?: Types.ObjectId
  status: 'valid' | 'invalid'
}

const FinancialMovementSchema = new Schema<IFinancialMovement>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    type: {
      type: String,
      enum: ['income', 'expense', 'transfer'],
      required: true
    },
    source: { type: Schema.Types.ObjectId, ref: 'Depot' },
    destination: { type: Schema.Types.ObjectId, ref: 'Depot' },
    status: { type: String, enum: ['valid', 'invalid'], default: 'valid' }
  },
  { toJSON: { virtuals: true }, timestamps: true }
)

const FinancialMovement = model<IFinancialMovement>(
  'FinancialMovement',
  FinancialMovementSchema
)

export default FinancialMovement
