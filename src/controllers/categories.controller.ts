import { Request, Response } from 'express'
import { ICreateCategoryUseCase } from '../use-cases/categories/create-category'
import { IUpdateCategoryUseCase } from '../use-cases/categories/update-category'
import { IDeleteCategoryUseCase } from '../use-cases/categories/delete-category'

export class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: ICreateCategoryUseCase,
    private readonly updateCategoryUseCase: IUpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: IDeleteCategoryUseCase
  ) {}

  createCategory = async (request: Request, response: Response) => {
    const result = await this.createCategoryUseCase.execute({
      name: request.body.name,
      user_id: request.user
    })
    return response.status(201).json(result)
  }

  updateCategory = async (request: Request, response: Response) => {
    const result = await this.updateCategoryUseCase.execute({
      category_id: request.params.id,
      name: request.body.name,
      user_id: request.user
    })
    return response.json(result)
  }

  deleteCategory = async (request: Request, response: Response) => {
    const result = await this.deleteCategoryUseCase.execute({
      category_id: request.params.id,
      user_id: request.user
    })
    return response.json(result)
  }
}
