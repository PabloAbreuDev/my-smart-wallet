import { injectable } from 'inversify'
import { AppError } from '../../common/errors/application.error'
import ChangePassword from '../../models/change-password'
import User from '../../models/user'
import bcrypt from 'bcrypt'

export interface IChangePasswordlUseCaseRequest {
  newPassword: string
  code: string
}

export interface IChangePasswordlUseCaseResponse {
  sucess: boolean
}

export interface IChangePasswordUseCase {
  execute(
    data: IChangePasswordlUseCaseRequest
  ): Promise<IChangePasswordlUseCaseResponse>
}

@injectable()
export class ChangePasswordUseCase implements IChangePasswordUseCase {
  async execute(
    data: IChangePasswordlUseCaseRequest
  ): Promise<IChangePasswordlUseCaseResponse> {
    const changePassword = await ChangePassword.findOne({ code: data.code })

    if (!changePassword) {
      throw new AppError('Invalid code', 400)
    }

    const salt = await bcrypt.genSalt(10)

    await User.findByIdAndUpdate(changePassword.user_id, {
      password: await bcrypt.hash(data.newPassword, salt)
    })

    changePassword.active = false
    await changePassword.save()

    return {
      sucess: true
    }
  }
}
