import { injectable } from 'inversify'
import { AppError } from '../../common/errors/application.error'
import FinancialMovement from '../../models/financial-movement'
import User from '../../models/user'
import { logger } from '../../utils/logger'
import Category from '../../models/category'

export interface ICreateFinancialMovementUseCaseRequest {
  user_id: string
  description: string
  amount: number
  type: 'income' | 'expense' | 'transfer'
  source?: string
  destination?: string
  categories?: string[]
}

export interface ICreateFinancialMovementUseCaseResponse {
  id: string
  user_id: string
  description: string
  amount: number
  type: 'income' | 'expense' | 'transfer'
  source?: string
  destination?: string
  categories?: string[]
}

export interface ICreateFinancialMovementUseCase {
  execute(
    data: ICreateFinancialMovementUseCaseRequest
  ): Promise<ICreateFinancialMovementUseCaseResponse | undefined>
}

@injectable()
export class CreateFinancialMovementUseCase
  implements ICreateFinancialMovementUseCase
{
  async execute(
    data: ICreateFinancialMovementUseCaseRequest
  ): Promise<ICreateFinancialMovementUseCaseResponse | undefined> {
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

    try {
      const newFinancialMovement = await FinancialMovement.create({
        user_id: data.user_id,
        description: data.description,
        amount: data.amount,
        type: data.type,
        source: data.source,
        destination: data.destination,
        categories: data.categories ? [...new Set(data.categories)] : []
      })

      return {
        id: newFinancialMovement.id,
        user_id: newFinancialMovement.user_id._id.toString(),
        description: newFinancialMovement.description,
        amount: newFinancialMovement.amount,
        type: newFinancialMovement.type,
        source: newFinancialMovement.source?._id.toString(),
        destination: newFinancialMovement.destination?._id.toString(),
        categories: newFinancialMovement.categories.map(item => {
          return item._id.toString()
        })
      }
    } catch (err) {
      logger.error(err)
      throw new AppError('Error doing movement', 400)
    }
  }
}
