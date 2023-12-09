import { inject, injectable } from "inversify";
import { IUserRepository } from "../data/repositories";
import { CreateUserRequestDTO } from "../dtos/create-user-dto/create-user-request.dto";
import { CreateUserResponseDTO } from "../dtos/create-user-dto/create-user-response.dto";
import { TYPES } from "../common/di/types";
import { AppError } from "../common/errors/application.error";
import { ISendEmailUseCase } from "./send-email";
import { welcome } from "../utils/emails/welcome";
import { generateUUID } from "../utils/string";

export interface ICreateUserWithEmailUseCase {
  execute(data: CreateUserRequestDTO): Promise<CreateUserResponseDTO>;
}

@injectable()
export class CreateUserWithEmailUseCase implements ICreateUserWithEmailUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,
    @inject(TYPES.SendEmailUseCase)
    private readonly sendEmailUseCase: ISendEmailUseCase
  ) {}

  async execute(data: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const dataDTO = data.getAll();

    const userExists = await this.userRepository.findOne({
      email: dataDTO.email,
    });

    if (userExists) {
      throw new AppError("User already exists", 400);
    }

    const verifyCode = generateUUID()

    const newUser = await this.userRepository.create({
      firstName: dataDTO.firstName,
      lastName: dataDTO.lastName,
      email: dataDTO.email,
      password: dataDTO.password,
      verifyCode: verifyCode
    });

    try {
      await this.sendEmailUseCase.execute(
        dataDTO.email,
        "Welcome to smart waller",
        welcome(dataDTO.firstName, verifyCode)
      );
    } catch (err) {
      console.log(err);
    }

    return new CreateUserResponseDTO({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    });
  }
}
