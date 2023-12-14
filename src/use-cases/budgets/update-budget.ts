import { injectable } from 'inversify'
import { AppError } from '../../common/errors/application.error'
import Budget from '../../models/budget'
import User from '../../models/user'
import { logger } from '../../utils/logger'

export interface IUpdateBudgetUseCaseRequest {
  user_id: string
  budget_id: string
  amount?: number
  period?: 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'annual'
  startDate?: Date
}

export interface IUpdateBudgetUseCaseResponse {
  id: string
  amount: number
  period: 'weekly' | 'monthly' | 'quarterly' | 'semiannual' | 'annual'
  startDate: Date
}

export interface IUpdateBudgetUseCase {
  execute(
    data: IUpdateBudgetUseCaseRequest
  ): Promise<IUpdateBudgetUseCaseResponse>
}

@injectable()
export class UpdateBudgetUseCase implements IUpdateBudgetUseCase {
  async execute(
    data: IUpdateBudgetUseCaseRequest
  ): Promise<IUpdateBudgetUseCaseResponse> {
    const userExist = await User.findById(data.user_id)

    if (!userExist) {
      throw new AppError('User not found', 400)
    }

    try {
      const budgetToUpdate = await Budget.findOneAndUpdate(
        { _id: data.budget_id, user_id: data.user_id },
        {
          amount: data.amount,
          period: data.period,
          startDate: data.startDate
        },
        { new: true }
      )

      if (!budgetToUpdate) {
        throw new AppError('Budget not found or could not be updated', 404)
      }

      return {
        id: budgetToUpdate.id,
        amount: budgetToUpdate.amount,
        period: budgetToUpdate.period,
        startDate: budgetToUpdate.startDate
      }
    } catch (err) {
      logger.error(err)
      throw new AppError('Error updating budget', 400)
    }
  }
}
