import { injectable } from 'inversify'
import { AppError } from '../../common/errors/application.error'
import Category from '../../models/category'
import User from '../../models/user'
import { logger } from '../../utils/logger'

export interface IUpdateCategoryUseCaseRequest {
  name: string
  user_id: string
  category_id: string
}
export interface IUpdateCategoryUseCaseResponse {
  id: string
  name: string
  user_id: string
}

export interface IUpdateCategoryUseCase {
  execute(
    data: IUpdateCategoryUseCaseRequest
  ): Promise<IUpdateCategoryUseCaseResponse | undefined>
}

@injectable()
export class UpdateCategoryUseCase implements IUpdateCategoryUseCase {
  async execute(
    data: IUpdateCategoryUseCaseRequest
  ): Promise<IUpdateCategoryUseCaseResponse | undefined> {
    const userExist = await User.findById(data.user_id)

    if (!userExist) {
      throw new AppError('User not found', 400)
    }

    const categoryExist = await Category.findById(data.category_id)

    if (!categoryExist) {
      throw new AppError('Category not found', 400)
    }

    const sameNameCategory = await Category.findOne({
      user_id: data.user_id,
      name: data.name
    })

    if (sameNameCategory) {
      throw new AppError('Already exists a category with this name', 400)
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      data.category_id,
      {
        name: data.name
      },
      { new: true }
    )

    if (!updatedCategory) {
      throw new AppError('Error updating category', 400)
    }

    if (updatedCategory) {
      return {
        id: updatedCategory.id,
        name: updatedCategory.name,
        user_id: updatedCategory.user_id._id.toString()
      }
    }
  }
}
