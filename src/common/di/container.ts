import { Container } from 'inversify'

import { TYPES } from './types'
import {
  ISendEmailUseCase,
  SendEmailNodemailerUseCase
} from '../../use-cases/send-email'
import {
  ConfirmAccountUseCase,
  IConfirmAccountUseCase
} from '../../use-cases/users/confirm-account'
import {
  CreateDepotUseCase,
  ICreateDepotUseCase
} from '../../use-cases/depots/create-depot'
import {
  ILoginWithEmailUseCase,
  LoginWithEmailUseCase
} from '../../use-cases/users/login-with-email'
import {
  IUpdateDepotUseCase,
  UpdateDepotUseCase
} from '../../use-cases/depots/update-depot'
import {
  DeleteDepotUseCase,
  IDeleteDepotUseCase
} from '../../use-cases/depots/delete-depot'
import {
  CreateFinancialMovementUseCase,
  ICreateFinancialMovementUseCase
} from '../../use-cases/financial-movements/create-financial-movement'
import {
  DeleteFinancialMovementUseCase,
  IDeleteFinancialMovementUseCase
} from '../../use-cases/financial-movements/delete-financial-movement'
import {
  EditFinancialMovementUseCase,
  IEditFinancialMovementUseCase
} from '../../use-cases/financial-movements/edit-financial-movement'
import {
  GetDepotsUseCase,
  IGetDepotsUseCase
} from '../../use-cases/depots/get-depots'
import {
  GetFinancialMovementsUseCase,
  IGetFinancialMovementsUseCase
} from '../../use-cases/financial-movements/get-financial-movements'
import {
  ICreateUserWithEmailUseCase,
  CreateUserWithEmailUseCase
} from '../../use-cases/users/create-user-with-email'
import {
  CreateCategoryUseCase,
  ICreateCategoryUseCase
} from '../../use-cases/categories/create-category'
import {
  IUpdateCategoryUseCase,
  UpdateCategoryUseCase
} from '../../use-cases/categories/update-category'
import {
  DeleteCategoryUseCase,
  IDeleteCategoryUseCase
} from '../../use-cases/categories/delete-category'
import {
  GetCategoriesUseCase,
  IGetCategoriesUseCase
} from '../../use-cases/categories/get-categories'

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

myContainer
  .bind<IUpdateDepotUseCase>(TYPES.UpdateDepotUseCase)
  .to(UpdateDepotUseCase)

myContainer
  .bind<IDeleteDepotUseCase>(TYPES.DeleteDepotUseCase)
  .to(DeleteDepotUseCase)

myContainer
  .bind<ICreateFinancialMovementUseCase>(TYPES.CreateFinancialMovementUseCase)
  .to(CreateFinancialMovementUseCase)

myContainer
  .bind<IDeleteFinancialMovementUseCase>(TYPES.DeleteFinancialMovementUseCase)
  .to(DeleteFinancialMovementUseCase)

myContainer
  .bind<IEditFinancialMovementUseCase>(TYPES.EditFinancialMovementUseCase)
  .to(EditFinancialMovementUseCase)

myContainer.bind<IGetDepotsUseCase>(TYPES.GetDepotsUseCase).to(GetDepotsUseCase)

myContainer
  .bind<IGetFinancialMovementsUseCase>(TYPES.GetFinancialMovementsUseCase)
  .to(GetFinancialMovementsUseCase)

myContainer
  .bind<ICreateCategoryUseCase>(TYPES.CreateCategoryUseCase)
  .to(CreateCategoryUseCase)

myContainer
  .bind<IUpdateCategoryUseCase>(TYPES.UpdateCategoryUseCase)
  .to(UpdateCategoryUseCase)

myContainer
  .bind<IDeleteCategoryUseCase>(TYPES.DeleteCategoryUseCase)
  .to(DeleteCategoryUseCase)

myContainer
  .bind<IGetCategoriesUseCase>(TYPES.GetCategoriesUseCase)
  .to(GetCategoriesUseCase)

export default myContainer
