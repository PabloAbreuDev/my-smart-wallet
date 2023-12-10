import { injectable } from 'inversify'
import { AppError } from '../common/errors/application.error'
import DepotModel from '../models/depot'
import User from '../models/user'

export interface ICreateDepotUseCaseRequest {
  name: string
  description: string
  user_id: string
}
export interface ICreateDepotUseCaseResponse {
  name: string
  description: string
  user_id: string
}

export interface ICreateDepotUseCase {
  execute(
    data: ICreateDepotUseCaseRequest
  ): Promise<ICreateDepotUseCaseResponse | undefined>
}

@injectable()
export class CreateDepotUseCase implements ICreateDepotUseCase {
  async execute(
    data: ICreateDepotUseCaseRequest
  ): Promise<ICreateDepotUseCaseResponse | undefined> {
    const userExist = await User.findById(data.user_id)

    if (!userExist) {
      throw new AppError('User not found', 400)
    }

    try {
      const newDepot = await DepotModel.create({
        name: data.name,
        description: data.description,
        user_id: data.user_id
      })

      return {
        name: newDepot.name,
        description: newDepot.description,
        user_id: newDepot.id
      }
    } catch (err) {
      console.log(err)
    }
  }
}
