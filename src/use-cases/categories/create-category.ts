import { injectable } from 'inversify'
import { AppError } from '../../common/errors/application.error'
import Category from '../../models/category'
import User from '../../models/user'

export interface ICreateCategoryUseCaseRequest {
  name: string
  user_id: string
}
export interface ICreateCategoryUseCaseResponse {
  id: string
  name: string
  user_id: string
}

export interface ICreateCategoryUseCase {
  execute(
    data: ICreateCategoryUseCaseRequest
  ): Promise<ICreateCategoryUseCaseResponse | undefined>
}
@injectable()
export class CreateCategoryUseCase implements ICreateCategoryUseCase {
  async execute(
    data: ICreateCategoryUseCaseRequest
  ): Promise<ICreateCategoryUseCaseResponse | undefined> {
    const userExist = await User.findById(data.user_id)

    if (!userExist) {
      throw new AppError('User not found', 400)
    }

    const sameNameCategory = await Category.findOne({
      user_id: data.user_id,
      name: data.name
    })

    if (sameNameCategory) {
      throw new AppError('Already exists a category with this name', 400)
    }

    try {
      const newCategory = await Category.create({
        name: data.name,
        user_id: data.user_id
      })
      return {
        name: newCategory.name,
        id: newCategory.id,
        user_id: newCategory.user_id._id.toString()
      }
    } catch (err) {
      throw new AppError('Error creating category', 400)
    }
  }
}
