import { Container } from 'inversify'
import {
  CreateUserWithEmailUseCase,
  ICreateUserWithEmailUseCase
} from '../../use-cases/create-user-with-email'
import { TYPES } from './types'
import {
  ISendEmailUseCase,
  SendEmailNodemailerUseCase
} from '../../use-cases/send-email'
import {
  ConfirmAccountUseCase,
  IConfirmAccountUseCase
} from '../../use-cases/confirm-account'
import {
  CreateDepotUseCase,
  ICreateDepotUseCase
} from '../../use-cases/create-depot'
import {
  ILoginWithEmailUseCase,
  LoginWithEmailUseCase
} from '../../use-cases/login-with-email'

const myContainer = new Container({ skipBaseClassChecks: true })
myContainer
  .bind<ICreateUserWithEmailUseCase>(TYPES.CreateUserWithEmailUseCase)
  .to(CreateUserWithEmailUseCase)
myContainer
  .bind<ISendEmailUseCase>(TYPES.SendEmailUseCase)
  .to(SendEmailNodemailerUseCase)
myContainer
  .bind<IConfirmAccountUseCase>(TYPES.ConfirmAccountUseCase)
  .to(ConfirmAccountUseCase)
myContainer
  .bind<ICreateDepotUseCase>(TYPES.CreateDepotUseCase)
  .to(CreateDepotUseCase)

myContainer
  .bind<ILoginWithEmailUseCase>(TYPES.LoginUseCase)
  .to(LoginWithEmailUseCase)

export default myContainer
