import { injectable } from 'inversify'
import { AppError } from '../common/errors/application.error'
import DepotModel from '../models/depot'
import User from '../models/user'

export interface IUpdateDepotUseCaseRequest {
  name: string
  description: string
  depot_id: string
  user_id: string
}

export interface IUpdateDepotUseCaseResponse {
  name: string
  description: string
  user_id: string
}

export interface IUpdateDepotUseCase {
  execute(
    data: IUpdateDepotUseCaseRequest
  ): Promise<IUpdateDepotUseCaseResponse>
}

@injectable()
export class UpdateDepotUseCase implements IUpdateDepotUseCase {
  async execute(
    data: IUpdateDepotUseCaseRequest
  ): Promise<IUpdateDepotUseCaseResponse> {
    const userExist = await User.findById(data.user_id)

    if (!userExist) {
      throw new AppError('User not found', 400)
    }

    const depotExist = await DepotModel.findOne({
      user_id: data.user_id,
      _id: data.depot_id
    })

    if (!depotExist) {
      throw new AppError('Depot not found', 400)
    }

    try {
      await DepotModel.findByIdAndUpdate(
        data.depot_id,
        {
          name: data.name,
          description: data.description
        },
        { new: true }
      )

      return {
        name: data.name,
        description: data.description,
        user_id: data.user_id
      }
    } catch (err) {
      throw new AppError('Error updating depot', 400)
    }
  }
}
