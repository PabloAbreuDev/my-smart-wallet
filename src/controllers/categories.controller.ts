import { Request, Response } from 'express'
import { ICreateCategoryUseCase } from '../use-cases/categories/create-category'
import { IUpdateCategoryUseCase } from '../use-cases/categories/update-category'
import { IDeleteCategoryUseCase } from '../use-cases/categories/delete-category'
import { IGetCategoriesUseCase } from '../use-cases/categories/get-categories'
import { inject, injectable } from 'inversify'
import { ControllerInterface } from '.'
import { TYPES } from '../common/di/types'

export interface ICategoriesController {
  createCategory: ControllerInterface
  updateCategory: ControllerInterface
  deleteCategory: ControllerInterface
  getCategories: ControllerInterface
}

@injectable()
export class CategoriesController implements ICategoriesController {
  constructor(
    @inject(TYPES.CreateCategoryUseCase)
    private readonly createCategoryUseCase: ICreateCategoryUseCase,
    @inject(TYPES.UpdateCategoryUseCase)
    private readonly updateCategoryUseCase: IUpdateCategoryUseCase,
    @inject(TYPES.DeleteCategoryUseCase)
    private readonly deleteCategoryUseCase: IDeleteCategoryUseCase,
    @inject(TYPES.GetCategoriesUseCase)
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
