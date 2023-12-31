import { Request, Response } from 'express'
import { IConfirmUserAccountUseCase } from '../use-cases/users/confirm-user-account'
import { ICreateUserWithEmailUseCase } from '../use-cases/users/create-user-with-email'
import User from '../models/user'
import { AppError } from '../common/errors/application.error'

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

  me = async (request: Request, response: Response) => {
    const user = await User.findById(request.user.id)
    if (!user) {
      throw new AppError('User not found', 400)
    }

    return response.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    })
  }
}
