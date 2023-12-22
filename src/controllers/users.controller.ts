import { Request, Response } from 'express'
import { IConfirmUserAccountUseCase } from '../use-cases/users/confirm-user-account'
import { ICreateUserWithEmailUseCase } from '../use-cases/users/create-user-with-email'

export class UsersController {
  constructor(
    private readonly createUserUseCase: ICreateUserWithEmailUseCase,
    private readonly confirmUserAccountUseCase: IConfirmUserAccountUseCase
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
}
