import { injectable } from 'inversify'
import { AppError } from '../../common/errors/application.error'
import Transaction from '../../models/transaction'
import User from '../../models/user'
import { logger } from '../../utils/logger'

export interface IDeleteTransactionUseCaseRequest {
  user_id: string
  transaction_id: string
}

export interface IDeleteTransactionUseCaseResponse {
  removed: boolean
}

export interface IDeleteTransactionUseCase {
  execute(
    data: IDeleteTransactionUseCaseRequest
  ): Promise<IDeleteTransactionUseCaseResponse | undefined>
}

@injectable()
export class DeleteTransactionUseCase implements IDeleteTransactionUseCase {
  async execute(
    data: IDeleteTransactionUseCaseRequest
  ): Promise<IDeleteTransactionUseCaseResponse | undefined> {
    const userExist = await User.findById(data.user_id)

    if (!userExist) {
      throw new AppError('User not found', 400)
    }

    try {
      const deletedTransaction = await Transaction.findOneAndDelete({
        _id: data.transaction_id,
        user_id: data.user_id
      })

      if (!deletedTransaction) {
        throw new AppError('Transaction not found or could not be deleted', 404)
      }

      return { removed: true }
    } catch (err) {
      logger.error(err)
      throw new AppError('Error deleting transaction', 400)
    }
  }
}
