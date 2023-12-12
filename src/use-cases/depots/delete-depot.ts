import { injectable } from 'inversify'
import DepotModel from '../../models/depot'

export interface IDeleteDepotUseCaseRequest {
  depot_id: string
  user_id: string
}
export interface IDeleteDepotUseCaseResponse {
  removed: boolean
}

export interface IDeleteDepotUseCase {
  execute(
    data: IDeleteDepotUseCaseRequest
  ): Promise<IDeleteDepotUseCaseResponse>
}

@injectable()
export class DeleteDepotUseCase implements IDeleteDepotUseCase {
  async execute(
    data: IDeleteDepotUseCaseRequest
  ): Promise<IDeleteDepotUseCaseResponse> {
    const removed = !!(await DepotModel.deleteOne({
      user_id: data.user_id,
      _id: data.depot_id
    }))

    return { removed }
  }
}
