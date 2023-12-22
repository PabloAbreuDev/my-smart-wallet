import { injectable, inject } from 'inversify'
import { TYPES } from '../../common/di/types'
import { AppError } from '../../common/errors/application.error'
import User from '../../models/user'
import { logger } from '../../utils/logger'
import { ISendEmailUseCase } from '../system/send-email'
import { onboardingGoogle } from '../../utils/emails-templates/onboarding-google'

export interface ICreateUserWithGoogleUseCaseRequest {
  firstName: string
  lastName: string
  email: string
  googleId: string
}

export interface ICreateUserWithGoogleUseCaseResponse {
  id: string
  googleId: string
  firstName: string
  lastName: string
  email: string
}

export interface ICreateUserWithGoogleUseCase {
  execute(
    data: ICreateUserWithGoogleUseCaseRequest
  ): Promise<ICreateUserWithGoogleUseCaseResponse>
}

@injectable()
export class CreateUserWithGoogleUseCase
  implements ICreateUserWithGoogleUseCase
{
  constructor(
    @inject(TYPES.SendEmailUseCase)
    private readonly sendEmailUseCase: ISendEmailUseCase
  ) {}

  async execute(
    data: ICreateUserWithGoogleUseCaseRequest
  ): Promise<ICreateUserWithGoogleUseCaseResponse> {
    const userExists = await User.findOne({
      email: data.email
    })

    if (userExists) {
      const updatedUser = await User.findByIdAndUpdate(
        userExists._id,
        {
          googleProvider: {
            id: data.googleId,
            email: data.email
          },
          verified: true,
          verifyCode: ''
        },
        { new: true }
      )

      if (!updatedUser) {
        throw new AppError('Error updating user', 400)
      }

      return {
        id: updatedUser.id,
        googleId: updatedUser.googleProvider.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email
      }
    }

    const newUser = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      currentProvider: 'GOOGLE',
      googleProvider: {
        id: data.googleId,
        email: data.email
      },
      verified: true,
      verifyCode: ''
    })

    try {
      await this.sendEmailUseCase.execute({
        to: data.email,
        subject: 'Welcome to smart wallet',
        template: onboardingGoogle(data.firstName)
      })
    } catch (err) {
      logger.error(err)
    }

    return {
      id: newUser.id,
      googleId: newUser.googleProvider.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email
    }
  }
}
