import { injectable } from 'inversify'
import { AppError } from '../../common/errors/application.error'
import Transaction from '../../models/transaction'
import User from '../../models/user'
import Category from '../../models/category'

export interface IEditTransactionUseCaseRequest {
  transaction_id: string
  user_id: string
  description: string
  amount: number
  type: 'income' | 'expense' | 'transfer'
  source?: string
  destination?: string
  categories?: string[]
}

export interface IEditTransactionUseCaseResponse {
  transaction_id: string
  user_id: string
  description: string
  amount: number
  type: 'income' | 'expense' | 'transfer'
  source?: string
  destination?: string
  categories?: string[]
}

export interface IEditTransactionUseCase {
  execute(
    data: IEditTransactionUseCaseRequest
  ): Promise<IEditTransactionUseCaseResponse | undefined>
}

@injectable()
export class EditTransactionUseCase implements IEditTransactionUseCase {
  async execute(
    data: IEditTransactionUseCaseRequest
  ): Promise<IEditTransactionUseCaseResponse | undefined> {
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

    const editedTransaction = await Transaction.findOneAndUpdate(
      { _id: data.transaction_id, user_id: data.user_id },
      {
        description: data.description,
        amount: data.amount,
        type: data.type,
        source: data.source,
        destination: data.destination,
        categories: data.categories ? [...new Set(data.categories)] : []
      },
      { new: true }
    )

    if (!editedTransaction) {
      throw new AppError('Transaction not found or could not be updated', 404)
    }

    return {
      transaction_id: editedTransaction.id,
      user_id: editedTransaction.user_id._id.toString(),
      description: editedTransaction.description,
      amount: editedTransaction.amount,
      type: editedTransaction.type,
      source: editedTransaction.source?._id.toString(),
      destination: editedTransaction.destination?._id.toString(),
      categories: editedTransaction.categories.map(item => item._id.toString())
    }
  }
}
