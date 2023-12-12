import { injectable } from 'inversify'
import { AppError } from '../../common/errors/application.error'
import FinancialMovement from '../../models/financial-movement'
import User from '../../models/user'
import Category from '../../models/category'

export interface IEditFinancialMovementUseCaseRequest {
  movement_id: string
  user_id: string
  description: string
  amount: number
  type: 'income' | 'expense' | 'transfer'
  source?: string
  destination?: string
  categories?: string[]
}

export interface IEditFinancialMovementUseCaseResponse {
  movement_id: string
  user_id: string
  description: string
  amount: number
  type: 'income' | 'expense' | 'transfer'
  source?: string
  destination?: string
  categories?: string[]
}

export interface IEditFinancialMovementUseCase {
  execute(
    data: IEditFinancialMovementUseCaseRequest
  ): Promise<IEditFinancialMovementUseCaseResponse | undefined>
}

@injectable()
export class EditFinancialMovementUseCase
  implements IEditFinancialMovementUseCase
{
  async execute(
    data: IEditFinancialMovementUseCaseRequest
  ): Promise<IEditFinancialMovementUseCaseResponse | undefined> {
    const userExist = await User.findById(data.user_id)

    if (!userExist) {
      throw new AppError('User not found', 400)
    }

    if (data.categories && data.categories.length > 0) {
      await Promise.all(
        data.categories.map(async item => {
          const categoryExist = await Category.findOne({
            _id: item,
            user_id: data.user_id
          })

          if (!categoryExist) {
            throw new AppError('Invalid category', 400)
          }
        })
      )
    }

    const editedFinancialMovement = await FinancialMovement.findOneAndUpdate(
      { _id: data.movement_id, user_id: data.user_id },
      {
        description: data.description,
        amount: data.amount,
        type: data.type,
        source: data.source,
        destination: data.destination,
        categories: data.categories ? [...new Set(data.categories)] : []
      },
      { new: true }
    )

    if (!editedFinancialMovement) {
      throw new AppError('Movement not found or could not be updated', 404)
    }

    return {
      movement_id: editedFinancialMovement.id,
      user_id: editedFinancialMovement.user_id._id.toString(),
      description: editedFinancialMovement.description,
      amount: editedFinancialMovement.amount,
      type: editedFinancialMovement.type,
      source: editedFinancialMovement.source?._id.toString(),
      destination: editedFinancialMovement.destination?._id.toString(),
      categories: editedFinancialMovement.categories.map(item =>
        item._id.toString()
      )
    }
  }
}
