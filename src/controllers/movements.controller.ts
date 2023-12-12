import { Request, Response } from 'express'
import { ICreateFinancialMovementUseCase } from '../use-cases/create-financial-movement'
import { IDeleteFinancialMovementUseCase } from '../use-cases/delete-financial-movement'

export class FinancialMovementsController {
  constructor(
    private readonly createFinancialMovementUseCase: ICreateFinancialMovementUseCase,
    private readonly deleteFinancialMovementUseCase: IDeleteFinancialMovementUseCase
  ) {}

  createFinancialMovements = async (request: Request, response: Response) => {
    const result = await this.createFinancialMovementUseCase.execute({
      source: request.body.source,
      destination: request.body.destination,
      amount: request.body.amount,
      type: request.body.type,
      description: request.body.description,
      user_id: request.user
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
}
