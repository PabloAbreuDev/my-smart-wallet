import { CreateUserRequestDTO } from "../dtos/create-user-dto/create-user-request.dto";
import { CreateUserResponseDTO } from "../dtos/create-user-dto/create-user-response.dto";
import UserModel from "../models/user";

export interface ICreateUserWithEmail{
    execute(data: CreateUserRequestDTO): Promise<CreateUserResponseDTO>
}

export class CreateUserWithEmail implements ICreateUserWithEmail{
    constructor(private readonly user: typeof UserModel = UserModel){}

    async execute(data: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {

       const newUser = await this.user.create({
            firstName: data.get("firstName"),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password')
        })

        return new CreateUserResponseDTO({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email
        })
    }
}