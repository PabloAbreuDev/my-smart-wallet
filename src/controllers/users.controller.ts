import { Request, Response } from "express";
import { ICreateUser } from "../use-cases/create-user.usecase";
import { CreateUserRequestDTO } from "../dtos/create-user-dto/create-user-request.dto";

export class UsersController {
    constructor(
        private readonly createUserUseCase: ICreateUser
    ){}

     createUser = async (request: Request, response: Response) =>{
        const data = new CreateUserRequestDTO(request.body)
        const result =  await this.createUserUseCase.execute(data)
        return response.json(result.getAll())
    }
}