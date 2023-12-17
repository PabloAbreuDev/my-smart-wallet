import { injectable } from 'inversify'
import { AppError } from '../../common/errors/application.error'
import Account from '../../models/account'
import User from '../../models/user'
import { logger } from '../../utils/logger'

export interface ICreateAccountUseCaseRequest {
  name: string
  description: string
  user_id: string
}
export interface ICreateAccountUseCaseResponse {
  name: string
  description: string
  user_id: string
}

export interface ICreateAccountUseCase {
  execute(
    data: ICreateAccountUseCaseRequest
  ): Promise<ICreateAccountUseCaseResponse | undefined>
}

@injectable()
export class CreateAccountUseCase implements ICreateAccountUseCase {
  async execute(
    data: ICreateAccountUseCaseRequest
  ): Promise<ICreateAccountUseCaseResponse | undefined> {
    const userExist = await User.findById(data.user_id)

    if (!userExist) {
      throw new AppError('User not found', 400)
    }

    try {
      const newAccount = await Account.create({
        name: data.name,
        description: data.description,
        user_id: data.user_id
      })

      return {
        name: newAccount.name,
        description: newAccount.description,
        user_id: newAccount.id
      }
    } catch (err) {
      logger.error(err)
      throw new AppError('Error creating account', 400)
    }
  }
}
