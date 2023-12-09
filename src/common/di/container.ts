import { Container } from "inversify";
import { IUserRepository } from "../../data/repositories";
import { CreateUserWithEmailUseCase, ICreateUserWithEmailUseCase } from "../../use-cases/create-user-with-email";
import { UserMongoDBRepository } from "../../data/mongodb/repositories/user-mongodb-repository";
import { TYPES } from "./types";
import { ISendEmailUseCase, SendEmailNodemailerUseCase } from "../../use-cases/send-email";
import { ConfirmAccountUseCase, IConfirmAccountUseCase } from "../../use-cases/confirm-account";

const myContainer = new Container({ skipBaseClassChecks: true});
myContainer.bind<ICreateUserWithEmailUseCase>(TYPES.CreateUserWithEmailUseCase).to(CreateUserWithEmailUseCase);
myContainer.bind<IUserRepository>(TYPES.UserRepository).to(UserMongoDBRepository);
myContainer.bind<ISendEmailUseCase>(TYPES.SendEmailUseCase).to(SendEmailNodemailerUseCase)
myContainer.bind<IConfirmAccountUseCase>(TYPES.ConfirmAccountUseCase).to(ConfirmAccountUseCase)

export default myContainer