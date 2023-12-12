import { Schema, model, Document, Types } from 'mongoose'

export interface ICategory extends Document {
  name: string
  user_id: Types.ObjectId
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { toJSON: { virtuals: true }, timestamps: true }
)

const Category = model<ICategory>('Category', CategorySchema)

export default Category
