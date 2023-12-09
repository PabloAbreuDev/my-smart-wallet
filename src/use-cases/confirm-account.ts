import { inject, injectable } from "inversify";
import { TYPES } from "../common/di/types";
import { IUserRepository } from "../data/repositories";
import { AppError } from "../common/errors/application.error";

export interface IConfirmAccountUseCase {
    execute(verifyCode: string): Promise<boolean>
}

@injectable()
export class ConfirmAccountUseCase implements IConfirmAccountUseCase {
    constructor(
        @inject(TYPES.UserRepository)
        private readonly userRepository: IUserRepository,
      ) {}
    
    async execute(verifyCode: string): Promise<boolean> {
       const userExist = await this.userRepository.findOne({verifyCode})
       if(!userExist){
        throw new AppError("Invalid verify code", 400)
       }
       const verifiedUser = await this.userRepository.verifyAccount(verifyCode)

       return !!verifiedUser
    }
}