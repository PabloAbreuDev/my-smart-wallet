import { Request, Response } from 'express'
import { IConfirmUserAccountUseCase } from '../use-cases/users/confirm-user-account'
import { ICreateUserWithEmailUseCase } from '../use-cases/users/create-user-with-email'
import User from '../models/user'
import { AppError } from '../common/errors/application.error'
import { IForgotPasswordUseCase } from '../use-cases/users/forgot-password'
import { IChangePasswordUseCase } from '../use-cases/users/change-password'

export class UsersController {
  constructor(
    private readonly createUserUseCase: ICreateUserWithEmailUseCase,
    private readonly confirmUserAccountUseCase: IConfirmUserAccountUseCase,
    private readonly forgotPasswordUseCase: IForgotPasswordUseCase,
    private readonly changePasswordUseCase: IChangePasswordUseCase
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

  forgot = async (request: Request, response: Response) => {
    await this.forgotPasswordUseCase.execute({
      email: request.body.email
    })
    return response.json({ message: 'Email sended' })
  }

  changePassword = async (request: Request, response: Response) => {
    const result = await this.changePasswordUseCase.execute({
      code: request.body.code,
      newPassword: request.body.newPassword
    })
    return response.json(result)
  }
}
