import { Container } from "inversify";
import { IUserRepository } from "../../data/repositories";
import { CreateUserWithEmailUseCase, ICreateUserWithEmailUseCase } from "../../use-cases/create-user-with-email";
import { UserMongoDBRepository } from "../../data/mongodb/repositories/user-mongodb-repository";
import { TYPES } from "./types";

const myContainer = new Container({ skipBaseClassChecks: true});
myContainer.bind<ICreateUserWithEmailUseCase>(TYPES.CreateUserWithEmail).to(CreateUserWithEmailUseCase);
myContainer.bind<IUserRepository>(TYPES.UserRepository).to(UserMongoDBRepository);

export default myContainer