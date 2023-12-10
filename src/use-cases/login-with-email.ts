import { AppError } from '../common/errors/application.error'
import { compareHash, generateJwtToken } from '../utils/encrypt-decrypt'
import User from '../models/user'
import { injectable } from 'inversify'

export interface ILoginWithEmailUseCaseRequest {
  email: string
  password: string
}

export interface ILoginWithEmailUseCaseResponse {
  token: string
}

export interface ILoginWithEmailUseCase {
  execute(
    data: ILoginWithEmailUseCaseRequest
  ): Promise<ILoginWithEmailUseCaseResponse>
}

@injectable()
export class LoginWithEmailUseCase implements ILoginWithEmailUseCase {
  async execute(
    data: ILoginWithEmailUseCaseRequest
  ): Promise<ILoginWithEmailUseCaseResponse> {
    const userExists = await User.findOne({ email: data.email })

    if (!userExists) {
      throw new AppError('Email or password invalid', 400)
    }

    const isValid = compareHash(data.password, userExists.password)

    if (!isValid) {
      throw new AppError('Email or password invalid', 400)
    }

    return { token: generateJwtToken({ id: userExists.id }) }
  }
}
