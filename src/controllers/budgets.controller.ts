import { Request, Response } from 'express'
import { ICreateBudgetUseCase } from '../use-cases/budgets/create-budget'
import { IDeleteBudgetUseCase } from '../use-cases/budgets/delete-budget'
import { IUpdateBudgetUseCase } from '../use-cases/budgets/update-budget'
import { IGetBudgetsUseCase } from '../use-cases/budgets/get-budgets'
import { ControllerInterface } from '.'
import { inject, injectable } from 'inversify'
import { TYPES } from '../common/di/types'

export interface IBudgetController {
  createBudget: ControllerInterface
  updateBudget: ControllerInterface
  deleteBudget: ControllerInterface
  getBudgets: ControllerInterface
}
@injectable()
export class BudgetsController implements IBudgetController {
  constructor(
    @inject(TYPES.CreateBudgetUseCase)
    private readonly createBudgetUseCase: ICreateBudgetUseCase,
    @inject(TYPES.UpdateBudgetUseCase)
    private readonly updateBudgetUseCase: IUpdateBudgetUseCase,
    @inject(TYPES.DeleteBudgetUseCase)
    private readonly deleteBudgetUseCase: IDeleteBudgetUseCase,
    @inject(TYPES.GetBudgetsUseCase)
    private readonly getBudgetsUseCase: IGetBudgetsUseCase
  ) {}

  createBudget = async (request: Request, response: Response) => {
    const result = await this.createBudgetUseCase.execute({
      user_id: request.user.id,
      category_id: request.body.category_id,
      amount: request.body.amount,
      startDate: request.body.startDate,
      period: request.body.period
    })
    return response.status(201).json(result)
  }

  updateBudget = async (request: Request, response: Response) => {
    const result = await this.updateBudgetUseCase.execute({
      user_id: request.user.id,
      budget_id: request.params.id,
      amount: request.body.amount,
      startDate: request.body.startDate,
      period: request.body.period
    })
    return response.json(result)
  }

  deleteBudget = async (request: Request, response: Response) => {
    const result = await this.deleteBudgetUseCase.execute({
      user_id: request.user.id,
      budget_id: request.params.id
    })
    return response.json(result)
  }

  getBudgets = async (request: Request, response: Response) => {
    const result = await this.getBudgetsUseCase.execute({
      user_id: request.user.id
    })
    return response.json(result)
  }
}
