import { Schema, Types, model } from 'mongoose'

export interface IDepot {
  name: string
  description: string
  user_id: Types.ObjectId
}

export const depotSchema = new Schema<IDepot>(
  {
    name: { type: String, required: true },
    description: { type: String },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { toJSON: { virtuals: true }, timestamps: true }
)

const DepotModel = model<IDepot>('Depot', depotSchema)

export default DepotModel
