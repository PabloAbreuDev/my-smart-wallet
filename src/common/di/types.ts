export const TYPES = {
  // User
  CreateUserWithEmailUseCase: Symbol.for('CreateUserWithEmailUseCase'),
  UserRepository: Symbol.for('UserRepository'),
  SendEmailUseCase: Symbol.for('SendEmailUseCase'),
  ConfirmUserAccountUseCase: Symbol.for('ConfirmUserAccountUseCase'),
  ForgotPasswordUseCase: Symbol.for('ForgotPasswordUseCase'),
  ChangePasswordUseCase: Symbol.for('ChangePasswordUseCase'),
  UsersController: Symbol.for('UsersController'),

  // Account
  CreateAccountUseCase: Symbol.for('CreateAccountUseCase'),
  CreateUserWithGoogleUseCase: Symbol.for('CreateUserWithGoogle'),
  UpdateAccountUseCase: Symbol.for('UpdateAccountUseCase'),
  DeleteAccountUseCase: Symbol.for('DeleteAccountUseCase'),
  GetAccountsUseCase: Symbol.for('GetAccountsUseCase'),
  AccountController: Symbol.for('AccountController'),

  // Transaction
  CreateTransactionUseCase: Symbol.for('CreateTransactionUseCase'),
  DeleteTransactionUseCase: Symbol.for('DeleteTransactionUseCase'),
  EditTransactionUseCase: Symbol.for('EditTransactionUseCase'),
  GetTransactionsUseCase: Symbol.for('GetTransactionsUseCase'),
  TransactionsController: Symbol.for('TransactionsController'),

  // Category
  CreateCategoryUseCase: Symbol.for('CreateCaregoryUseCase'),
  UpdateCategoryUseCase: Symbol.for('UpdateCategoryUseCase'),
  DeleteCategoryUseCase: Symbol.for('DeleteCategoryUseCase'),
  GetCategoriesUseCase: Symbol.for('GetCategoriesUseCase'),
  CategoriesController: Symbol.for('CategoriesController'),

  // Budget
  CreateBudgetUseCase: Symbol.for('CreateBudgetUseCase'),
  UpdateBudgetUseCase: Symbol.for('UpdateBudgetUseCase'),
  DeleteBudgetUseCase: Symbol.for('DeleteBudgetUseCase'),
  GetBudgetsUseCase: Symbol.for('GetBudgetsUseCase'),
  BudgetController: Symbol.for('BudgetController')
}
