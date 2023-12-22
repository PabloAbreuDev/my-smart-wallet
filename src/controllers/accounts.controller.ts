import { ICreateAccountUseCase } from '../use-cases/accounts/create-account'
import { Request, Response } from 'express'
import { IUpdateAccountUseCase } from '../use-cases/accounts/update-account'
import { IDeleteAccountUseCase } from '../use-cases/accounts/delete-account'
import { IGetAccountsUseCase } from '../use-cases/accounts/get-accounts'

export class AccountsController {
  constructor(
    private readonly createAccountUseCase: ICreateAccountUseCase,
    private readonly updateAccountUseCase: IUpdateAccountUseCase,
    private readonly deleteAccountUseCase: IDeleteAccountUseCase,
    private readonly getAccountsUseCase: IGetAccountsUseCase
  ) {}

  createAccount = async (request: Request, response: Response) => {
    const result = await this.createAccountUseCase.execute({
      name: request.body.name,
      description: request.body.description,
      user_id: request.user.id
    })
    return response.status(201).json(result)
  }

  updateAccount = async (request: Request, response: Response) => {
    const result = await this.updateAccountUseCase.execute({
      account_id: request.params.id,
      description: request.body.description,
      name: request.body.name,
      user_id: request.user.id
    })
    return response.json(result)
  }

  deleteAccount = async (request: Request, response: Response) => {
    const result = await this.deleteAccountUseCase.execute({
      user_id: request.user.id,
      account_id: request.params.id
    })
    return response.json(result)
  }

  getAccounts = async (request: Request, response: Response) => {
    const result = await this.getAccountsUseCase.execute({
      user_id: request.user.id
    })
    return response.json(result)
  }
}
