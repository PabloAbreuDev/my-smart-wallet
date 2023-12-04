import { CreateUserRequestDTO } from "../dtos/create-user-dto/create-user-request.dto";
import { CreateUserResponseDTO } from "../dtos/create-user-dto/create-user-response.dto";

export interface ICreateUser{
    execute(data: CreateUserRequestDTO): Promise<CreateUserResponseDTO>
}

export class CreateUser implements ICreateUser{
    async execute(data: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
        return new CreateUserResponseDTO({
            firstName: data.get("firstName"),
            lastName: data.get('lastName'),
            email: data.get('email')
        })
    }
}