import { injectable } from 'inversify'
import { AppError } from '../../common/errors/application.error'
import User from '../../models/user'
import Account, { IAccount } from '../../models/account'

export interface IGetAccountsUseCaseRequest {
  user_id: string
}
export interface IGetAccountsUseCaseResponse {
  accounts: IAccount[]
}
export interface IGetAccountsUseCase {
  execute(
    data: IGetAccountsUseCaseRequest
  ): Promise<IGetAccountsUseCaseResponse | undefined>
}

@injectable()
export class GetAccountsUseCase implements IGetAccountsUseCase {
  async execute(
    data: IGetAccountsUseCaseRequest
  ): Promise<IGetAccountsUseCaseResponse | undefined> {
    const userExist = await User.findById(data.user_id)

    if (!userExist) {
      throw new AppError('User not found', 400)
    }

    const accounts = await Account.find({ user_id: data.user_id })

    return { accounts: accounts }
  }
}
