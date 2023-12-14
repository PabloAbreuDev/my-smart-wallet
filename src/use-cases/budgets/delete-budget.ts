import { injectable } from 'inversify'
import { AppError } from '../../common/errors/application.error'
import Budget from '../../models/budget'
import User from '../../models/user'
import { logger } from '../../utils/logger'

export interface IDeleteBudgetUseCaseRequest {
  user_id: string
  budget_id: string
}

export interface IDeleteBudgetUseCaseResponse {
  removed: boolean
}

export interface IDeleteBudgetUseCase {
  execute(
    data: IDeleteBudgetUseCaseRequest
  ): Promise<IDeleteBudgetUseCaseResponse>
}

@injectable()
export class DeleteBudgetUseCase implements IDeleteBudgetUseCase {
  async execute(
    data: IDeleteBudgetUseCaseRequest
  ): Promise<IDeleteBudgetUseCaseResponse> {
    const userExist = await User.findById(data.user_id)

    if (!userExist) {
      throw new AppError('User not found', 400)
    }

    try {
      const deletedBudget = await Budget.findOneAndDelete({
        _id: data.budget_id,
        user_id: data.user_id
      })

      if (!deletedBudget) {
        throw new AppError('Budget not found or could not be deleted', 404)
      }

      return { removed: true }
    } catch (err) {
      logger.error(err)
      throw new AppError('Error deleting budget', 400)
    }
  }
}
