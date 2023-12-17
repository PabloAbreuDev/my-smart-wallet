import { Request, Response } from 'express'
import { IConfirmUserAccountUseCase } from '../use-cases/users/confirm-user-account'
import { ILoginWithEmailUseCase } from '../use-cases/users/login-with-email'
import { ICreateUserWithEmailUseCase } from '../use-cases/users/create-user-with-email'

export class UsersController {
  constructor(
    private readonly createUserUseCase: ICreateUserWithEmailUseCase,
    private readonly confirmUserAccountUseCase: IConfirmUserAccountUseCase,
    private readonly loginUseCase: ILoginWithEmailUseCase
  ) {}

  createUser = async (request: Request, response: Response) => {
    const result = await this.createUserUseCase.execute(request.body)
    return response.status(201).json(result)
  }

  confirmUserAccount = async (request: Request, response: Response) => {
    const result = await this.confirmUserAccountUseCase.execute(
      request.params.verifycode
    )
    return response.json({ sucess: result })
  }

  login = async (request: Request, response: Response) => {
    const result = await this.loginUseCase.execute(request.body)
    return response.json(result)
  }
}
