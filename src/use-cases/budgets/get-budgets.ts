import { injectable } from 'inversify'
import Budget from '../../models/budget'
import { AppError } from '../../common/errors/application.error'

export interface IGetBudgetsUseCaseRequest {
  user_id: string
}

export interface IGetBudgetsUseCaseResponse {
  budgets: Budget[]
}

export interface IGetBudgetsUseCase {
  execute(data: IGetBudgetsUseCaseRequest): Promise<IGetBudgetsUseCaseResponse>
}

@injectable()
export class GetBudgetsUseCase implements IGetBudgetsUseCase {
  async execute(
    data: IGetBudgetsUseCaseRequest
  ): Promise<IGetBudgetsUseCaseResponse> {
    try {
      const budgets = await Budget.find({ user_id: data.user_id })
      return { budgets }
    } catch (error) {
      throw new AppError('Error getting budgets', 500)
    }
  }
}
