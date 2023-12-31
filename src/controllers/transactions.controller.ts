import { Request, Response } from 'express'
import { ICreateTransactionUseCase } from '../use-cases/transactions/create-transaction'
import { IDeleteTransactionUseCase } from '../use-cases/transactions/delete-transaction'
import { IEditTransactionUseCase } from '../use-cases/transactions/edit-transaction'
import { IGetTransactionsUseCase } from '../use-cases/transactions/get-transaction'
import { inject, injectable } from 'inversify'
import { ControllerInterface } from '.'
import { TYPES } from '../common/di/types'

export interface ITransactionsController {
  createTransaction: ControllerInterface
  deleteTransaction: ControllerInterface
  editTransaction: ControllerInterface
  getTransaction: ControllerInterface
}

@injectable()
export class TransactionsController implements ITransactionsController {
  constructor(
    @inject(TYPES.CreateTransactionUseCase)
    private readonly createTransactionUseCase: ICreateTransactionUseCase,
    @inject(TYPES.DeleteTransactionUseCase)
    private readonly deleteTransactionUseCase: IDeleteTransactionUseCase,
    @inject(TYPES.EditTransactionUseCase)
    private readonly editTransactionUseCase: IEditTransactionUseCase,
    @inject(TYPES.GetTransactionsUseCase)
    private readonly getTransactionsUseCase: IGetTransactionsUseCase
  ) {}

  createTransaction = async (request: Request, response: Response) => {
    const result = await this.createTransactionUseCase.execute({
      source: request.body.source,
      destination: request.body.destination,
      amount: request.body.amount,
      type: request.body.type,
      description: request.body.description,
      user_id: request.user.id,
      categories: request.body.categories
    })
    return response.status(201).json(result)
  }

  deleteTransaction = async (request: Request, response: Response) => {
    const result = await this.deleteTransactionUseCase.execute({
      transaction_id: request.params.id,
      user_id: request.user.id
    })
    return response.status(200).json(result)
  }

  editTransaction = async (request: Request, response: Response) => {
    const result = await this.editTransactionUseCase.execute({
      source: request.body.source,
      destination: request.body.destination,
      amount: request.body.amount,
      type: request.body.type,
      description: request.body.description,
      user_id: request.user.id,
      transaction_id: request.params.id,
      categories: request.body.categories
    })
    return response.status(200).json(result)
  }

  getTransaction = async (request: Request, response: Response) => {
    const result = await this.getTransactionsUseCase.execute({
      user_id: request.user.id
    })
    return response.status(200).json(result)
  }
}
