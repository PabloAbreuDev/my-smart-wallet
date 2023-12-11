import { ICreateDepotUseCase } from '../use-cases/create-depot'
import { Request, Response } from 'express'
import { IUpdateDepotUseCase } from '../use-cases/update-depot'
import { IDeleteDepotUseCase } from '../use-cases/delete-depot'

export class DepotsController {
  constructor(
    private readonly createDepotUseCase: ICreateDepotUseCase,
    private readonly updateDepotUseCase: IUpdateDepotUseCase,
    private readonly deleteDepotUseCase: IDeleteDepotUseCase
  ) {}

  createDepot = async (request: Request, response: Response) => {
    const result = await this.createDepotUseCase.execute({
      name: request.body.name,
      description: request.body.description,
      user_id: request.user
    })
    return response.status(201).json(result)
  }

  updateDepot = async (request: Request, response: Response) => {
    const result = await this.updateDepotUseCase.execute({
      depot_id: request.params.id,
      description: request.body.description,
      name: request.body.name,
      user_id: request.user
    })
    return response.json(result)
  }

  deleteDepot = async (request: Request, response: Response) => {
    const result = await this.deleteDepotUseCase.execute({
      user_id: request.user,
      depot_id: request.params.id
    })
    return response.json(result)
  }
}
