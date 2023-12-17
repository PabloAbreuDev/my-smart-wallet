import { injectable } from 'inversify'
import Account from '../../models/account'

export interface IDeleteAccountUseCaseRequest {
  account_id: string
  user_id: string
}
export interface IDeleteAccountUseCaseResponse {
  removed: boolean
}

export interface IDeleteAccountUseCase {
  execute(
    data: IDeleteAccountUseCaseRequest
  ): Promise<IDeleteAccountUseCaseResponse>
}

@injectable()
export class DeleteAccountUseCase implements IDeleteAccountUseCase {
  async execute(
    data: IDeleteAccountUseCaseRequest
  ): Promise<IDeleteAccountUseCaseResponse> {
    const removed = !!(await Account.deleteOne({
      user_id: data.user_id,
      _id: data.account_id
    }))

    return { removed }
  }
}
