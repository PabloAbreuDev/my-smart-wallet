import { injectable } from 'inversify'
import { AppError } from '../../common/errors/application.error'
import Transaction from '../../models/transaction'
import User from '../../models/user'
import { logger } from '../../utils/logger'
import Category from '../../models/category'

export interface ICreateTransactionUseCaseRequest {
  user_id: string
  description: string
  amount: number
  type: 'income' | 'expense' | 'transfer'
  source?: string
  destination?: string
  categories?: string[]
}

export interface ICreateTransactionUseCaseResponse {
  id: string
  user_id: string
  description: string
  amount: number
  type: 'income' | 'expense' | 'transfer'
  source?: string
  destination?: string
  categories?: string[]
}

export interface ICreateTransactionUseCase {
  execute(
    data: ICreateTransactionUseCaseRequest
  ): Promise<ICreateTransactionUseCaseResponse | undefined>
}

@injectable()
export class CreateTransactionUseCase implements ICreateTransactionUseCase {
  async execute(
    data: ICreateTransactionUseCaseRequest
  ): Promise<ICreateTransactionUseCaseResponse | undefined> {
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

    try {
      const newTransaction = await Transaction.create({
        user_id: data.user_id,
        description: data.description,
        amount: data.amount,
        type: data.type,
        source: data.source,
        destination: data.destination,
        categories: data.categories ? [...new Set(data.categories)] : []
      })

      return {
        id: newTransaction.id,
        user_id: newTransaction.user_id._id.toString(),
        description: newTransaction.description,
        amount: newTransaction.amount,
        type: newTransaction.type,
        source: newTransaction.source?._id.toString(),
        destination: newTransaction.destination?._id.toString(),
        categories: newTransaction.categories.map(item => {
          return item._id.toString()
        })
      }
    } catch (err) {
      logger.error(err)
      throw new AppError('Error doing transaction', 400)
    }
  }
}
