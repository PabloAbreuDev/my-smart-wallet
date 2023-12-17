import { injectable } from 'inversify'
import { AppError } from '../../common/errors/application.error'
import Category from '../../models/category'
import Transaction from '../../models/transaction'
import User from '../../models/user'

export interface IDeleteCategoryUseCaseRequest {
  category_id: string
  user_id: string
}
export interface IDeleteCategoryUseCaseResponse {
  removed: boolean
}
export interface IDeleteCategoryUseCase {
  execute(
    data: IDeleteCategoryUseCaseRequest
  ): Promise<IDeleteCategoryUseCaseResponse | undefined>
}

@injectable()
export class DeleteCategoryUseCase implements IDeleteCategoryUseCase {
  async execute(
    data: IDeleteCategoryUseCaseRequest
  ): Promise<IDeleteCategoryUseCaseResponse | undefined> {
    const userExist = await User.findById(data.user_id)

    if (!userExist) {
      throw new AppError('User not found', 400)
    }

    const categoryExist = await Category.findOne({
      _id: data.category_id,
      user_id: data.user_id
    })

    if (!categoryExist) {
      throw new AppError('Category not found', 400)
    }

    await Transaction.updateMany(
      { user_id: data.user_id, categories: data.category_id },
      { $pull: { categories: data.category_id } }
    )

    const removedCategory = await Category.findByIdAndDelete(data.category_id)

    if (!removedCategory) {
      throw new AppError('Error deleting category', 500)
    }

    return { removed: true }
  }
}
