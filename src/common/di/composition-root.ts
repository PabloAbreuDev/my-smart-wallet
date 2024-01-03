import { IConfirmUserAccountUseCase } from '../../use-cases/users/confirm-user-account'
import { ICreateAccountUseCase } from '../../use-cases/accounts/create-account'
import { ICreateTransactionUseCase } from '../../use-cases/transactions/create-transaction'
import { IDeleteAccountUseCase } from '../../use-cases/accounts/delete-account'
import { IDeleteTransactionUseCase } from '../../use-cases/transactions/delete-transaction'
import { IEditTransactionUseCase } from '../../use-cases/transactions/edit-transaction'
import { IGetAccountsUseCase } from '../../use-cases/accounts/get-accounts'
import { IGetTransactionsUseCase } from '../../use-cases/transactions/get-transaction'
import { IUpdateAccountUseCase } from '../../use-cases/accounts/update-account'
import myContainer from './container'
import { TYPES } from './types'
import { ICreateCategoryUseCase } from '../../use-cases/categories/create-category'
import { IUpdateCategoryUseCase } from '../../use-cases/categories/update-category'
import { ICreateUserWithEmailUseCase } from '../../use-cases/users/create-user-with-email'
import { IDeleteCategoryUseCase } from '../../use-cases/categories/delete-category'
import { IGetCategoriesUseCase } from '../../use-cases/categories/get-categories'
import { ICreateBudgetUseCase } from '../../use-cases/budgets/create-budget'
import { IUpdateBudgetUseCase } from '../../use-cases/budgets/update-budget'
import { IDeleteBudgetUseCase } from '../../use-cases/budgets/delete-budget'
import { IGetBudgetsUseCase } from '../../use-cases/budgets/get-budgets'
import { ICreateUserWithGoogleUseCase } from '../../use-cases/users/create-user-with-google'
import { IForgotPasswordUseCase } from '../../use-cases/users/forgot-password'
import { IChangePasswordUseCase } from '../../use-cases/users/change-password'
import { IAccountController } from '../../controllers/accounts.controller'
import { IBudgetController } from '../../controllers/budgets.controller'
import { ICategoriesController } from '../../controllers/categories.controller'
import { ITransactionsController } from '../../controllers/transactions.controller'
import { IUsersController } from '../../controllers/users.controller'

export const createUserWithEmail = myContainer.get<ICreateUserWithEmailUseCase>(
  TYPES.CreateUserWithEmailUseCase
)
export const confirmUserAccount = myContainer.get<IConfirmUserAccountUseCase>(
  TYPES.ConfirmUserAccountUseCase
)
export const createAccountUseCase = myContainer.get<ICreateAccountUseCase>(
  TYPES.CreateAccountUseCase
)

export const createUserWithGoogleUseCase =
  myContainer.get<ICreateUserWithGoogleUseCase>(
    TYPES.CreateUserWithGoogleUseCase
  )

export const updateAccountUseCase = myContainer.get<IUpdateAccountUseCase>(
  TYPES.UpdateAccountUseCase
)

export const deleteAccountUsecase = myContainer.get<IDeleteAccountUseCase>(
  TYPES.DeleteAccountUseCase
)

export const createTransactionUseCase =
  myContainer.get<ICreateTransactionUseCase>(TYPES.CreateTransactionUseCase)

export const deleteTransactionUseCase =
  myContainer.get<IDeleteTransactionUseCase>(TYPES.DeleteTransactionUseCase)

export const editTransactionUseCase = myContainer.get<IEditTransactionUseCase>(
  TYPES.EditTransactionUseCase
)

export const getAccountsUseCase = myContainer.get<IGetAccountsUseCase>(
  TYPES.GetAccountsUseCase
)

export const getTransactionsUseCase = myContainer.get<IGetTransactionsUseCase>(
  TYPES.GetTransactionsUseCase
)

export const createCategoryUseCase = myContainer.get<ICreateCategoryUseCase>(
  TYPES.CreateCategoryUseCase
)

export const updateCategoryUseCase = myContainer.get<IUpdateCategoryUseCase>(
  TYPES.UpdateCategoryUseCase
)

export const deleteCategoryUseCase = myContainer.get<IDeleteCategoryUseCase>(
  TYPES.DeleteCategoryUseCase
)

export const getCategoriesUseCase = myContainer.get<IGetCategoriesUseCase>(
  TYPES.GetCategoriesUseCase
)

export const createBudgetUseCase = myContainer.get<ICreateBudgetUseCase>(
  TYPES.CreateBudgetUseCase
)

export const updateBudgetUseCase = myContainer.get<IUpdateBudgetUseCase>(
  TYPES.UpdateBudgetUseCase
)

export const deleteBudgetUseCase = myContainer.get<IDeleteBudgetUseCase>(
  TYPES.DeleteBudgetUseCase
)

export const getBudgetsUseCase = myContainer.get<IGetBudgetsUseCase>(
  TYPES.GetBudgetsUseCase
)

export const forgotPasswordUseCase = myContainer.get<IForgotPasswordUseCase>(
  TYPES.ForgotPasswordUseCase
)

export const changePasswordUseCase = myContainer.get<IChangePasswordUseCase>(
  TYPES.ChangePasswordUseCase
)

export const accountController = myContainer.get<IAccountController>(
  TYPES.AccountController
)

export const budgetsController = myContainer.get<IBudgetController>(
  TYPES.BudgetController
)

export const categoriesController = myContainer.get<ICategoriesController>(
  TYPES.CategoriesController
)

export const transactionsController = myContainer.get<ITransactionsController>(
  TYPES.TransactionsController
)

export const usersController = myContainer.get<IUsersController>(
  TYPES.UsersController
)
