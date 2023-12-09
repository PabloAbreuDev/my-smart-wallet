import { injectable } from "inversify";
import { IUserRepository, WithId } from "../../repositories";
import UserModel, { IUser } from "../models/user";
import { DefaultMongoDBRepository } from "./default-mongodb-repository";


@injectable()
export class UserMongoDBRepository
  extends DefaultMongoDBRepository<IUser> implements IUserRepository
{
  constructor(userModel = UserModel) {
    super(userModel);
  }
  async verifyAccount(verifyCode: string): Promise<WithId<IUser>> {
   const updated =  await UserModel.findOneAndUpdate({verifyCode, verified: false}, {verified: true, verifyCode: ""}, {new: true})
   return updated?.toJSON()  as WithId<IUser>;
  }
  
}