import { Request, Response } from 'express'
import { ICreateCategoryUseCase } from '../use-cases/categories/create-category'
import { IUpdateCategoryUseCase } from '../use-cases/categories/update-category'
import { IDeleteCategoryUseCase } from '../use-cases/categories/delete-category'
import { IGetCategoriesUseCase } from '../use-cases/categories/get-categories'

export class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: ICreateCategoryUseCase,
    private readonly updateCategoryUseCase: IUpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: IDeleteCategoryUseCase,
    private readonly getCategoriesUseCase: IGetCategoriesUseCase
  ) {}

  createCategory = async (request: Request, response: Response) => {
    const result = await this.createCategoryUseCase.execute({
      name: request.body.name,
      user_id: request.user.id
    })
    return response.status(201).json(result)
  }

  updateCategory = async (request: Request, response: Response) => {
    const result = await this.updateCategoryUseCase.execute({
      category_id: request.params.id,
      name: request.body.name,
      user_id: request.user.id
    })
    return response.json(result)
  }

  deleteCategory = async (request: Request, response: Response) => {
    const result = await this.deleteCategoryUseCase.execute({
      category_id: request.params.id,
      user_id: request.user.id
    })
    return response.json(result)
  }

  getCategories = async (request: Request, response: Response) => {
    const result = await this.getCategoriesUseCase.execute({
      user_id: request.user.id
    })
    return response.json(result)
  }
}
