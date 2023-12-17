import { injectable } from 'inversify'
import { AppError } from '../../common/errors/application.error'
import Transaction, { ITransaction } from '../../models/transaction'
import User from '../../models/user'

export interface IGetTransactionsUseCaseRequest {
  user_id: string
}

export interface IGetTransactionsUseCaseResponse {
  transactions: ITransaction[]
}

export interface IGetTransactionsUseCase {
  execute(
    data: IGetTransactionsUseCaseRequest
  ): Promise<IGetTransactionsUseCaseResponse | undefined>
}

@injectable()
export class GetTransactionsUseCase implements IGetTransactionsUseCase {
  async execute(
    data: IGetTransactionsUseCaseRequest
  ): Promise<IGetTransactionsUseCaseResponse | undefined> {
    const userExist = await User.findById(data.user_id)

    if (!userExist) {
      throw new AppError('User not found', 400)
    }

    const transactions = await Transaction.find({
      user_id: data.user_id
    })

    return {
      transactions: transactions
    }
  }
}
