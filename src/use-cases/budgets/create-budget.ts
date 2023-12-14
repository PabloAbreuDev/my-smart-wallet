import { injectable } from 'inversify'
import { AppError } from '../../common/errors/application.error'
import Budget from '../../models/budget'
import Category from '../../models/category'
import User from '../../models/user'
import { logger } from '../../utils/logger'

export interface ICreateBudgetUseCaseRequest {
  user_id: string
  category_id: string
  amount: number
  period: 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'annual'
  startDate: Date
}

export interface ICreateBudgetUseCaseResponse {
  id: string
  user_id: string
  category_id: string
  amount: number
  period: 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'annual'
  startDate: Date
}

export interface ICreateBudgetUseCase {
  execute(
    data: ICreateBudgetUseCaseRequest
  ): Promise<ICreateBudgetUseCaseResponse>
}

@injectable()
export class CreateBudgetUseCase implements ICreateBudgetUseCase {
  async execute(
    data: ICreateBudgetUseCaseRequest
  ): Promise<ICreateBudgetUseCaseResponse> {
    const userExist = await User.findById(data.user_id)

    if (!userExist) {
      throw new AppError('User not found', 400)
    }

    const categoryExist = await Category.findOne({
      _id: data.category_id,
      user_id: data.user_id
    })

    if (!categoryExist) {
      throw new AppError('Category not found', 400)
    }

    try {
      const newBudget = await Budget.create({
        user_id: data.user_id,
        category_id: data.category_id,
        amount: data.amount,
        period: data.period,
        startDate: data.startDate
      })

      return {
        id: newBudget.id,
        amount: newBudget.amount,
        category_id: newBudget.category_id._id.toString(),
        period: newBudget.period,
        startDate: newBudget.startDate,
        user_id: newBudget.user_id._id.toString()
      }
    } catch (err) {
      console.log(err)
      logger.error(err)
      throw new AppError('Error creating budget', 400)
    }
  }
}
