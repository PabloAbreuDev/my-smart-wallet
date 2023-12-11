import { injectable } from 'inversify'
import { AppError } from '../common/errors/application.error'
import FinancialMovement from '../models/financial-movement'
import User from '../models/user'
import { logger } from '../utils/logger'

export interface ICreateFinancialMovementUseCaseRequest {
  user_id: string
  description: string
  amount: number
  type: 'income' | 'expense' | 'transfer'
  source?: string
  destination?: string
}

export interface ICreateFinancialMovementUseCaseResponse {
  user_id: string
  description: string
  amount: number
  type: 'income' | 'expense' | 'transfer'
  source?: string
  destination?: string
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
    console.log(data)

    if (!userExist) {
      throw new AppError('User not found', 400)
    }

    try {
      const newFinancialMovement = await FinancialMovement.create({
        user_id: data.user_id,
        description: data.description,
        amount: data.amount,
        type: data.type,
        source: data.source,
        destination: data.destination
      })

      return {
        user_id: newFinancialMovement.user_id._id.toString(),
        description: newFinancialMovement.description,
        amount: newFinancialMovement.amount,
        type: newFinancialMovement.type,
        source: newFinancialMovement.source?._id.toString(),
        destination: newFinancialMovement.destination?._id.toString()
      }
    } catch (err) {
      logger.error(err)
      throw new AppError('Error doing movement', 400)
    }
  }
}
