import { injectable } from 'inversify'
import { AppError } from '../../common/errors/application.error'
import Category, { ICategory } from '../../models/category'
import User from '../../models/user'

export interface IGetCategoriesUseCaseRequest {
  user_id: string
}
export interface IGetCategoriesUseCaseResponse {
  categories: ICategory[]
}

export interface IGetCategoriesUseCase {
  execute(
    data: IGetCategoriesUseCaseRequest
  ): Promise<IGetCategoriesUseCaseResponse | undefined>
}

@injectable()
export class GetCategoriesUseCase implements IGetCategoriesUseCase {
  async execute(
    data: IGetCategoriesUseCaseRequest
  ): Promise<IGetCategoriesUseCaseResponse | undefined> {
    const userExist = await User.findById(data.user_id)

    if (!userExist) {
      throw new AppError('User not found', 400)
    }

    const categories = await Category.find({
      user_id: data.user_id
    })

    return {
      categories
    }
  }
}
