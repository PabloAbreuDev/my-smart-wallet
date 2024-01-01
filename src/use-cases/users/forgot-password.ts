import { inject, injectable } from 'inversify'
import { TYPES } from '../../common/di/types'
import { ISendEmailUseCase } from '../system/send-email'
import User from '../../models/user'
import { AppError } from '../../common/errors/application.error'
import ChangePassword from '../../models/change-password'
import { forgotPassword } from '../../utils/emails-templates/forgot-password'
import { logger } from '../../utils/logger'

export interface IForgotPasswordlUseCaseRequest {
  email: string
}

export interface IForgotPasswordlUseCaseResponse {
  forgot_password_id: string
  code: string
}

export interface IForgotPasswordUseCase {
  execute(
    data: IForgotPasswordlUseCaseRequest
  ): Promise<IForgotPasswordlUseCaseResponse>
}

@injectable()
export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
  constructor(
    @inject(TYPES.SendEmailUseCase)
    private readonly sendEmailUseCase: ISendEmailUseCase
  ) {}
  async execute(
    data: IForgotPasswordlUseCaseRequest
  ): Promise<IForgotPasswordlUseCaseResponse> {
    const userExists = await User.findOne({ email: data.email })

    if (!userExists) {
      throw new AppError('Invalid email', 400)
    }

    const newChangePassword = await ChangePassword.create({
      user_id: userExists._id
    })

    try {
      await this.sendEmailUseCase.execute({
        to: userExists.email,
        subject: 'Forgot Password',
        template: forgotPassword(userExists.firstName, newChangePassword.code)
      })
    } catch (err) {
      logger.error(JSON.stringify(err))
    }

    return {
      code: newChangePassword.code,
      forgot_password_id: newChangePassword.id
    }
  }
}
