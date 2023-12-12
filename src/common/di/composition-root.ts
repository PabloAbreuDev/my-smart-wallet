import { IConfirmAccountUseCase } from '../../use-cases/users/confirm-account'
import { ICreateDepotUseCase } from '../../use-cases/depots/create-depot'
import { ICreateFinancialMovementUseCase } from '../../use-cases/financial-movements/create-financial-movement'
import { IDeleteDepotUseCase } from '../../use-cases/depots/delete-depot'
import { IDeleteFinancialMovementUseCase } from '../../use-cases/financial-movements/delete-financial-movement'
import { IEditFinancialMovementUseCase } from '../../use-cases/financial-movements/edit-financial-movement'
import { IGetDepotsUseCase } from '../../use-cases/depots/get-depots'
import { IGetFinancialMovementsUseCase } from '../../use-cases/financial-movements/get-financial-movements'
import { ILoginWithEmailUseCase } from '../../use-cases/users/login-with-email'
import { IUpdateDepotUseCase } from '../../use-cases/depots/update-depot'
import myContainer from './container'
import { TYPES } from './types'
import { ICreateCategoryUseCase } from '../../use-cases/categories/create-category'
import { IUpdateCategoryUseCase } from '../../use-cases/categories/update-category'
import { ICreateUserWithEmailUseCase } from '../../use-cases/users/create-user-with-email'

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

export const getDepotsUseCase = myContainer.get<IGetDepotsUseCase>(
  TYPES.GetDepotsUseCase
)

export const getFinancialMovementsUseCase =
  myContainer.get<IGetFinancialMovementsUseCase>(
    TYPES.GetFinancialMovementsUseCase
  )

export const createCategoryUseCase = myContainer.get<ICreateCategoryUseCase>(
  TYPES.CreateCategoryUseCase
)

export const updateCategoryUseCase = myContainer.get<IUpdateCategoryUseCase>(
  TYPES.UpdateCategoryUseCase
)
