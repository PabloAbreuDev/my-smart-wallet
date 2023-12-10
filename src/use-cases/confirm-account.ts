import { injectable } from "inversify";
import { AppError } from "../common/errors/application.error";
import UserModel from "../models/user";

export interface IConfirmAccountUseCase {
  execute(verifyCode: string): Promise<boolean>;
}

@injectable()
export class ConfirmAccountUseCase implements IConfirmAccountUseCase {
  constructor() {}

  async execute(verifyCode: string): Promise<boolean> {
    const userExist = await UserModel.findOne({ verifyCode });

    if (!userExist) {
      throw new AppError("Invalid verify code", 400);
    }

    const verifiedUser = await UserModel.findByIdAndUpdate(userExist._id, {
      verified: true,
      verifyCode: "",
    });
    return !!verifiedUser;
  }
}
