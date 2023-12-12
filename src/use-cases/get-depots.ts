import { injectable } from 'inversify'
import { AppError } from '../common/errors/application.error'
import User from '../models/user'
import DepotModel, { IDepot } from '../models/depot'

export interface IGetDepotsUseCaseRequest {
  user_id: string
}
export interface IGetDepotsUseCaseResponse {
  depots: IDepot[]
}
export interface IGetDepotsUseCase {
  execute(
    data: IGetDepotsUseCaseRequest
  ): Promise<IGetDepotsUseCaseResponse | undefined>
}

@injectable()
export class GetDepotsUseCase implements IGetDepotsUseCase {
  async execute(
    data: IGetDepotsUseCaseRequest
  ): Promise<IGetDepotsUseCaseResponse | undefined> {
    const userExist = await User.findById(data.user_id)

    if (!userExist) {
      throw new AppError('User not found', 400)
    }

    const depots = await DepotModel.find({ user_id: data.user_id })

    return { depots }
  }
}
