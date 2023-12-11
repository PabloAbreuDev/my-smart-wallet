import { IConfirmAccountUseCase } from '../../use-cases/confirm-account'
import { ICreateDepotUseCase } from '../../use-cases/create-depot'
import { ICreateFinancialMovementUseCase } from '../../use-cases/create-financial-movement'
import { ICreateUserWithEmailUseCase } from '../../use-cases/create-user-with-email'
import { IDeleteDepotUseCase } from '../../use-cases/delete-depot'
import { ILoginWithEmailUseCase } from '../../use-cases/login-with-email'
import { IUpdateDepotUseCase } from '../../use-cases/update-depot'
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

export const updateDepotUseCase = myContainer.get<IUpdateDepotUseCase>(
  TYPES.UpdateDepotUseCase
)

export const deleteDepotUsecase = myContainer.get<IDeleteDepotUseCase>(
  TYPES.DeleteDepotUseCase
)

export const createFinancialMovementUseCase =
  myContainer.get<ICreateFinancialMovementUseCase>(
    TYPES.CreateFinancialMovementUseCase
  )
