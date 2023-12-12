import { injectable } from 'inversify'
import { AppError } from '../common/errors/application.error'
import FinancialMovement, {
  IFinancialMovement
} from '../models/financial-movement'
import User from '../models/user'

export interface IGetFinancialMovementsUseCaseRequest {
  user_id: string
}
export interface IGetFinancialMovementsUseCaseResponse {
  financial_movements: IFinancialMovement[]
}
export interface IGetFinancialMovementsUseCase {
  execute(
    data: IGetFinancialMovementsUseCaseRequest
  ): Promise<IGetFinancialMovementsUseCaseResponse | undefined>
}

@injectable()
export class GetFinancialMovementsUseCase
  implements IGetFinancialMovementsUseCase
{
  async execute(
    data: IGetFinancialMovementsUseCaseRequest
  ): Promise<IGetFinancialMovementsUseCaseResponse | undefined> {
    const userExist = await User.findById(data.user_id)

    if (!userExist) {
      throw new AppError('User not found', 400)
    }

    const financialMovements = await FinancialMovement.find({
      user_id: data.user_id
    })

    return {
      financial_movements: financialMovements
    }
  }
}
