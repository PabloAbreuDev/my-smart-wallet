import { inject, injectable } from 'inversify'
import { TYPES } from '../common/di/types'
import { AppError } from '../common/errors/application.error'
import { ISendEmailUseCase } from './send-email'
import { welcome } from '../utils/emails-templates/welcome'
import { generateUUID } from '../utils/encrypt-decrypt'
import User from '../models/user'

export interface ICreateUserWithEmailUseCaseRequest {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface ICreateUserWithEmailUseCaseResponse {
  firstName: string
  lastName: string
  email: string
}

export interface ICreateUserWithEmailUseCase {
  execute(
    data: ICreateUserWithEmailUseCaseRequest
  ): Promise<ICreateUserWithEmailUseCaseResponse>
}

@injectable()
export class CreateUserWithEmailUseCase implements ICreateUserWithEmailUseCase {
  constructor(
    @inject(TYPES.SendEmailUseCase)
    private readonly sendEmailUseCase: ISendEmailUseCase
  ) {}

  async execute(
    data: ICreateUserWithEmailUseCaseRequest
  ): Promise<ICreateUserWithEmailUseCaseResponse> {
    const userExists = await User.findOne({
      email: data.email
    })

    if (userExists) {
      throw new AppError('User already exists', 400)
    }

    const verifyCode = generateUUID()

    const newUser = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      verifyCode: verifyCode
    })

    try {
      await this.sendEmailUseCase.execute({
        to: data.email,
        subject: 'Welcome to smart waller',
        template: welcome(data.firstName, verifyCode)
      })
    } catch (err) {
      console.log(err)
    }

    return {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email
    }
  }
}
