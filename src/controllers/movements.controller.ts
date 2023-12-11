import { Request, Response } from 'express'
import { ICreateFinancialMovementUseCase } from '../use-cases/create-financial-movement'

export class FinancialMovementsController {
  constructor(
    private readonly createFinancialMovimentUseCase: ICreateFinancialMovementUseCase
  ) {}

  createFinancialMovements = async (request: Request, response: Response) => {
    const result = await this.createFinancialMovimentUseCase.execute({
      source: request.body.source,
      destination: request.body.destination,
      amount: request.body.amount,
      type: request.body.type,
      description: request.body.description,
      user_id: request.user
    })
    return response.status(201).json(result)
  }
}
