import { Request, Response } from 'express'
import { ICreateFinancialMovementUseCase } from '../use-cases/financial-movements/create-financial-movement'
import { IDeleteFinancialMovementUseCase } from '../use-cases/financial-movements/delete-financial-movement'
import { IEditFinancialMovementUseCase } from '../use-cases/financial-movements/edit-financial-movement'
import { IGetFinancialMovementsUseCase } from '../use-cases/financial-movements/get-financial-movements'

export class FinancialMovementsController {
  constructor(
    private readonly createFinancialMovementUseCase: ICreateFinancialMovementUseCase,
    private readonly deleteFinancialMovementUseCase: IDeleteFinancialMovementUseCase,
    private readonly editFinancialMovementUseCase: IEditFinancialMovementUseCase,
    private readonly getFinancialMovementsUseCase: IGetFinancialMovementsUseCase
  ) {}

  createFinancialMovements = async (request: Request, response: Response) => {
    const result = await this.createFinancialMovementUseCase.execute({
      source: request.body.source,
      destination: request.body.destination,
      amount: request.body.amount,
      type: request.body.type,
      description: request.body.description,
      user_id: request.user,
      categories: request.body.categories
    })
    return response.status(201).json(result)
  }

  deleteFinancialMovement = async (request: Request, response: Response) => {
    const result = await this.deleteFinancialMovementUseCase.execute({
      movement_id: request.params.id,
      user_id: request.user
    })
    return response.status(200).json(result)
  }

  editFinancialMovement = async (request: Request, response: Response) => {
    const result = await this.editFinancialMovementUseCase.execute({
      source: request.body.source,
      destination: request.body.destination,
      amount: request.body.amount,
      type: request.body.type,
      description: request.body.description,
      user_id: request.user,
      movement_id: request.params.id,
      status: request.body.status,
      categories: request.body.categories
    })
    return response.status(200).json(result)
  }

  getFinancialMovemenets = async (request: Request, response: Response) => {
    const result = await this.getFinancialMovementsUseCase.execute({
      user_id: request.user
    })
    return response.status(200).json(result)
  }
}
