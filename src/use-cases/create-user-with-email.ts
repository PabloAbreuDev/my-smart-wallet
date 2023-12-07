import { inject, injectable } from "inversify";
import { IUserRepository } from "../data/repositories";
import { CreateUserRequestDTO } from "../dtos/create-user-dto/create-user-request.dto";
import { CreateUserResponseDTO } from "../dtos/create-user-dto/create-user-response.dto";
import { TYPES } from "../config/di/types";

export interface ICreateUserWithEmail {
  execute(data: CreateUserRequestDTO): Promise<CreateUserResponseDTO>;
}

@injectable()
export class CreateUserWithEmail implements ICreateUserWithEmail {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(data: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const newUser = await this.userRepository.create({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    });

    return new CreateUserResponseDTO({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    });
  }
}
