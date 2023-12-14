import { Schema, Types, model, Document } from 'mongoose'

interface Budget extends Document {
  user_id: Types.ObjectId
  category_id: Types.ObjectId
  amount: number
  period: 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'annual'
  startDate: Date
}

const BudgetSchema = new Schema<Budget>(
  {
    user_id: { type: Schema.Types.ObjectId, required: true },
    category_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category'
    },
    amount: { type: Number, required: true },
    period: {
      type: String,
      enum: ['weekly', 'monthly', 'quarterly', 'semiannual', 'annual'],
      required: true
    },
    startDate: { type: Date, required: true }
  },
  { toJSON: { virtuals: true }, timestamps: true }
)

const Budget = model<Budget>('Budget', BudgetSchema)

export default Budget
