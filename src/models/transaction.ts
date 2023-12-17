import { Schema, Types, model } from 'mongoose'

export interface ITransaction extends Document {
  user_id: Types.ObjectId
  description: string
  amount: number
  type: 'income' | 'expense' | 'transfer'
  source?: Types.ObjectId
  destination?: Types.ObjectId
  categories: Types.ObjectId[]
}

const TransactionSchema = new Schema<ITransaction>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    type: {
      type: String,
      enum: ['income', 'expense', 'transfer'],
      required: true
    },
    source: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    destination: { type: Schema.Types.ObjectId, ref: 'Account' },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
  },
  { toJSON: { virtuals: true }, timestamps: true }
)

const Transaction = model<ITransaction>('Transaction', TransactionSchema)

export default Transaction
