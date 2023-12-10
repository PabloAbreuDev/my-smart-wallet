import { IConfirmAccountUseCase } from '../../use-cases/confirm-account'
import { ICreateDepotUseCase } from '../../use-cases/create-depot'
import { ICreateUserWithEmailUseCase } from '../../use-cases/create-user-with-email'
import { ILoginWithEmailUseCase } from '../../use-cases/login-with-email'
import myContainer from './container'
import { TYPES } from './types'

export const createUserWithEmail = myContainer.get<ICreateUserWithEmailUseCase>(
  TYPES.CreateUserWithEmailUseCase
)
export const confirmAccount = myContainer.get<IConfirmAccountUseCase>(
  TYPES.ConfirmAccountUseCase
)
export const createDepot = myContainer.get<ICreateDepotUseCase>(
  TYPES.CreateDepotUseCase
)

export const loginUseCase = myContainer.get<ILoginWithEmailUseCase>(
  TYPES.LoginUseCase
)
