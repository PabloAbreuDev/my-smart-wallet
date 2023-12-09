import { Request, Response } from "express";
import { ICreateUserWithEmailUseCase } from "../use-cases/create-user-with-email";
import { CreateUserRequestDTO } from "../dtos/create-user-dto/create-user-request.dto";
import { IConfirmAccountUseCase } from "../use-cases/confirm-account";

export class UsersController {
  constructor(
    private readonly createUserUseCase: ICreateUserWithEmailUseCase,
    private readonly confirmAccountUseCase: IConfirmAccountUseCase
  ) {}

  createUser = async (request: Request, response: Response) => {
    const data = new CreateUserRequestDTO(request.body);
    const result = await this.createUserUseCase.execute(data);
    return response.json(result.getAll());
  };

  confirmAccount = async (request: Request, response: Response) => {
    const result = await this.confirmAccountUseCase.execute(request.params.verifycode)
    return response.json({sucess: result})
  };
}
