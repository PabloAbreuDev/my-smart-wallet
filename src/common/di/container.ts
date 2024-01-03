import { Container } from 'inversify'

import { TYPES } from './types'
import {
  ISendEmailUseCase,
  SendEmailNodemailerUseCase
} from '../../use-cases/system/send-email'
import {
  ConfirmUserAccountUseCase,
  IConfirmUserAccountUseCase
} from '../../use-cases/users/confirm-user-account'
import {
  CreateAccountUseCase,
  ICreateAccountUseCase
} from '../../use-cases/accounts/create-account'

import {
  IUpdateAccountUseCase,
  UpdateAccountUseCase
} from '../../use-cases/accounts/update-account'
import {
  DeleteAccountUseCase,
  IDeleteAccountUseCase
} from '../../use-cases/accounts/delete-account'
import {
  CreateTransactionUseCase,
  ICreateTransactionUseCase
} from '../../use-cases/transactions/create-transaction'
import {
  DeleteTransactionUseCase,
  IDeleteTransactionUseCase
} from '../../use-cases/transactions/delete-transaction'
import {
  EditTransactionUseCase,
  IEditTransactionUseCase
} from '../../use-cases/transactions/edit-transaction'
import {
  GetAccountsUseCase,
  IGetAccountsUseCase
} from '../../use-cases/accounts/get-accounts'
import {
  GetTransactionsUseCase,
  IGetTransactionsUseCase
} from '../../use-cases/transactions/get-transaction'
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
import {
  CreateBudgetUseCase,
  ICreateBudgetUseCase
} from '../../use-cases/budgets/create-budget'
import {
  IUpdateBudgetUseCase,
  UpdateBudgetUseCase
} from '../../use-cases/budgets/update-budget'
import {
  DeleteBudgetUseCase,
  IDeleteBudgetUseCase
} from '../../use-cases/budgets/delete-budget'
import {
  GetBudgetsUseCase,
  IGetBudgetsUseCase
} from '../../use-cases/budgets/get-budgets'
import {
  CreateUserWithGoogleUseCase,
  ICreateUserWithGoogleUseCase
} from '../../use-cases/users/create-user-with-google'
import {
  ForgotPasswordUseCase,
  IForgotPasswordUseCase
} from '../../use-cases/users/forgot-password'
import {
  ChangePasswordUseCase,
  IChangePasswordUseCase
} from '../../use-cases/users/change-password'
import {
  AccountsController,
  IAccountController
} from '../../controllers/accounts.controller'
import {
  BudgetsController,
  IBudgetController
} from '../../controllers/budgets.controller'
import {
  CategoriesController,
  ICategoriesController
} from '../../controllers/categories.controller'
import {
  ITransactionsController,
  TransactionsController
} from '../../controllers/transactions.controller'
import {
  IUsersController,
  UsersController
} from '../../controllers/users.controller'

const myContainer = new Container({ skipBaseClassChecks: true })
myContainer
  .bind<ICreateUserWithEmailUseCase>(TYPES.CreateUserWithEmailUseCase)
  .to(CreateUserWithEmailUseCase)
myContainer
  .bind<ISendEmailUseCase>(TYPES.SendEmailUseCase)
  .to(SendEmailNodemailerUseCase)
myContainer
  .bind<IConfirmUserAccountUseCase>(TYPES.ConfirmUserAccountUseCase)
  .to(ConfirmUserAccountUseCase)
myContainer
  .bind<ICreateAccountUseCase>(TYPES.CreateAccountUseCase)
  .to(CreateAccountUseCase)

myContainer
  .bind<ICreateUserWithGoogleUseCase>(TYPES.CreateUserWithGoogleUseCase)
  .to(CreateUserWithGoogleUseCase)

myContainer
  .bind<IUpdateAccountUseCase>(TYPES.UpdateAccountUseCase)
  .to(UpdateAccountUseCase)

myContainer
  .bind<IDeleteAccountUseCase>(TYPES.DeleteAccountUseCase)
  .to(DeleteAccountUseCase)

myContainer
  .bind<ICreateTransactionUseCase>(TYPES.CreateTransactionUseCase)
  .to(CreateTransactionUseCase)

myContainer
  .bind<IDeleteTransactionUseCase>(TYPES.DeleteTransactionUseCase)
  .to(DeleteTransactionUseCase)

myContainer
  .bind<IEditTransactionUseCase>(TYPES.EditTransactionUseCase)
  .to(EditTransactionUseCase)

myContainer
  .bind<IGetAccountsUseCase>(TYPES.GetAccountsUseCase)
  .to(GetAccountsUseCase)

myContainer
  .bind<IGetTransactionsUseCase>(TYPES.GetTransactionsUseCase)
  .to(GetTransactionsUseCase)

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

myContainer
  .bind<ICreateBudgetUseCase>(TYPES.CreateBudgetUseCase)
  .to(CreateBudgetUseCase)

myContainer
  .bind<IUpdateBudgetUseCase>(TYPES.UpdateBudgetUseCase)
  .to(UpdateBudgetUseCase)

myContainer
  .bind<IDeleteBudgetUseCase>(TYPES.DeleteBudgetUseCase)
  .to(DeleteBudgetUseCase)

myContainer
  .bind<IGetBudgetsUseCase>(TYPES.GetBudgetsUseCase)
  .to(GetBudgetsUseCase)

myContainer
  .bind<IForgotPasswordUseCase>(TYPES.ForgotPasswordUseCase)
  .to(ForgotPasswordUseCase)

myContainer
  .bind<IChangePasswordUseCase>(TYPES.ChangePasswordUseCase)
  .to(ChangePasswordUseCase)

myContainer
  .bind<IAccountController>(TYPES.AccountController)
  .to(AccountsController)

myContainer
  .bind<IBudgetController>(TYPES.BudgetController)
  .to(BudgetsController)

myContainer
  .bind<ICategoriesController>(TYPES.CategoriesController)
  .to(CategoriesController)

myContainer
  .bind<ITransactionsController>(TYPES.TransactionsController)
  .to(TransactionsController)

myContainer.bind<IUsersController>(TYPES.UsersController).to(UsersController)

export default myContainer
