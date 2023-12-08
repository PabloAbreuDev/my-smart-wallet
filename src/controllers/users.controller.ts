import { Request, Response } from "express";
import { ICreateUserWithEmailUseCase } from "../use-cases/create-user-with-email";
import { CreateUserRequestDTO } from "../dtos/create-user-dto/create-user-request.dto";

export class UsersController {
    constructor(
        private readonly createUserUseCase: ICreateUserWithEmailUseCase
    ){}

     createUser = async (request: Request, response: Response) =>{
        const data = new CreateUserRequestDTO(request.body)
        const result =  await this.createUserUseCase.execute(data)
        return response.json(result.getAll())
    }
}