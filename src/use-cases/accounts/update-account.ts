import { injectable } from 'inversify'
import { AppError } from '../../common/errors/application.error'
import Account from '../../models/account'
import User from '../../models/user'

export interface IUpdateAccountUseCaseRequest {
  name: string
  description: string
  account_id: string
  user_id: string
}

export interface IUpdateAccountUseCaseResponse {
  name: string
  description: string
  user_id: string
}

export interface IUpdateAccountUseCase {
  execute(
    data: IUpdateAccountUseCaseRequest
  ): Promise<IUpdateAccountUseCaseResponse>
}

@injectable()
export class UpdateAccountUseCase implements IUpdateAccountUseCase {
  async execute(
    data: IUpdateAccountUseCaseRequest
  ): Promise<IUpdateAccountUseCaseResponse> {
    const userExist = await User.findById(data.user_id)

    if (!userExist) {
      throw new AppError('User not found', 400)
    }

    const accountExist = await Account.findOne({
      user_id: data.user_id,
      _id: data.account_id
    })

    if (!accountExist) {
      throw new AppError('Account not found', 400)
    }

    const updatedAccount = await Account.findByIdAndUpdate(
      data.account_id,
      {
        name: data.name,
        description: data.description
      },
      { new: true }
    )

    if (!updatedAccount) {
      throw new AppError('Error updating account', 400)
    }

    return {
      name: updatedAccount.name,
      description: updatedAccount.description,
      user_id: updatedAccount.user_id._id.toString()
    }
  }
}
