import { Request, Response } from 'express'
import { ICreateUserWithEmailUseCase } from '../use-cases/create-user-with-email'
import { IConfirmAccountUseCase } from '../use-cases/confirm-account'
import { ILoginWithEmailUseCase } from '../use-cases/login-with-email'

export class UsersController {
  constructor(
    private readonly createUserUseCase: ICreateUserWithEmailUseCase,
    private readonly confirmAccountUseCase: IConfirmAccountUseCase,
    private readonly loginUseCase: ILoginWithEmailUseCase
  ) {}

  createUser = async (request: Request, response: Response) => {
    const result = await this.createUserUseCase.execute(request.body)
    return response.status(201).json(result)
  }

  confirmAccount = async (request: Request, response: Response) => {
    const result = await this.confirmAccountUseCase.execute(
      request.params.verifycode
    )
    return response.json({ sucess: result })
  }

  login = async (request: Request, response: Response) => {
    const result = await this.loginUseCase.execute(request.body)
    return response.json(result)
  }
}
