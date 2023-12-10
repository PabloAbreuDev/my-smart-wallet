import { Request, Response } from "express";
import { ICreateUserWithEmailUseCase } from "../use-cases/create-user-with-email";
import { IConfirmAccountUseCase } from "../use-cases/confirm-account";
import { ICreateDepotUseCase } from "../use-cases/create-depot";

export class UsersController {
  constructor(
    private readonly createUserUseCase: ICreateUserWithEmailUseCase,
    private readonly confirmAccountUseCase: IConfirmAccountUseCase,
    private readonly createDepotUseCase: ICreateDepotUseCase
  ) {}

  createUser = async (request: Request, response: Response) => {
    const result = await this.createUserUseCase.execute(request.body);
    return response.json(result);
  };

  confirmAccount = async (request: Request, response: Response) => {
    const result = await this.confirmAccountUseCase.execute(
      request.params.verifycode
    );
    return response.json({ sucess: result });
  };

  createDepot = async (request: Request, response: Response) => {
    const result = await this.createDepotUseCase.execute(request.body);
    return response.json(result);
  };
}
