import { IConfirmAccountUseCase } from '../../use-cases/confirm-account'
import { ICreateDepotUseCase } from '../../use-cases/create-depot'
import { ICreateFinancialMovementUseCase } from '../../use-cases/create-financial-movement'
import { ICreateUserWithEmailUseCase } from '../../use-cases/create-user-with-email'
import { IDeleteDepotUseCase } from '../../use-cases/delete-depot'
import { IDeleteFinancialMovementUseCase } from '../../use-cases/delete-financial-movement'
import { IEditFinancialMovementUseCase } from '../../use-cases/edit-financial-movement'
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

export const deleteFinancialMovementUseCase =
  myContainer.get<IDeleteFinancialMovementUseCase>(
    TYPES.DeleteFinancialMovementUseCase
  )

export const editFinancialMovementUseCase =
  myContainer.get<IEditFinancialMovementUseCase>(
    TYPES.EditFinancialMovementUseCase
  )
