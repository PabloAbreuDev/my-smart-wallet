import { inject, injectable } from "inversify";
import { IUserRepository } from "../data/repositories";
import { CreateUserRequestDTO } from "../dtos/create-user-dto/create-user-request.dto";
import { CreateUserResponseDTO } from "../dtos/create-user-dto/create-user-response.dto";
import { TYPES } from "../config/di/types";

export interface ICreateUserWithEmailUseCase {
  execute(data: CreateUserRequestDTO): Promise<CreateUserResponseDTO>;
}

@injectable()
export class CreateUserWithEmailUseCase implements ICreateUserWithEmailUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(data: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {

    const userExists = await this.userRepository.findOne({email: data.get("email")})

    if(userExists){
      throw new Error("User already exist's")
    }
    
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
