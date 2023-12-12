import { injectable } from 'inversify'
import { AppError } from '../../common/errors/application.error'
import FinancialMovement from '../../models/financial-movement'
import User from '../../models/user'
import { logger } from '../../utils/logger'

export interface IDeleteFinancialMovementUseCaseRequest {
  user_id: string
  movement_id: string
}

export interface IDeleteFinancialMovementUseCaseResponse {
  removed: boolean
}

export interface IDeleteFinancialMovementUseCase {
  execute(
    data: IDeleteFinancialMovementUseCaseRequest
  ): Promise<IDeleteFinancialMovementUseCaseResponse | undefined>
}

@injectable()
export class DeleteFinancialMovementUseCase
  implements IDeleteFinancialMovementUseCase
{
  async execute(
    data: IDeleteFinancialMovementUseCaseRequest
  ): Promise<IDeleteFinancialMovementUseCaseResponse | undefined> {
    const userExist = await User.findById(data.user_id)

    if (!userExist) {
      throw new AppError('User not found', 400)
    }

    try {
      const deletedMovement = await FinancialMovement.findOneAndUpdate(
        { _id: data.movement_id, user_id: data.user_id },
        {
          status: 'invalid'
        }
      )

      if (!deletedMovement) {
        throw new AppError('Movement not found or could not be updated', 404)
      }

      return { removed: !!deletedMovement }
    } catch (err) {
      logger.error(err)
      throw new AppError('Error deleting movement', 400)
    }
  }
}
