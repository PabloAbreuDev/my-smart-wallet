import { IUserRepository } from ".";
import UserModel, { IUser } from "../../models/user";
import { DefaultMongoDBRepository } from "./default-mongodb-repository";

export class UserMongoDBRepository
  extends DefaultMongoDBRepository<IUser> implements IUserRepository
{
  constructor(userModel = UserModel) {
    super(userModel);
  }
}