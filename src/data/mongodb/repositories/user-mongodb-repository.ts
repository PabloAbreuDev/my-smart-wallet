import { injectable } from "inversify";
import { IUserRepository } from "../../repositories";
import UserModel, { IUser } from "../models/user";
import { DefaultMongoDBRepository } from "./default-mongodb-repository";


@injectable()
export class UserMongoDBRepository
  extends DefaultMongoDBRepository<IUser> implements IUserRepository
{
  constructor(userModel = UserModel) {
    super(userModel);
  }
}