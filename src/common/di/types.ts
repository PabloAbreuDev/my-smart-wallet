export const TYPES = {
  // User
  CreateUserWithEmailUseCase: Symbol.for('CreateUserWithEmailUseCase'),
  UserRepository: Symbol.for('UserRepository'),
  SendEmailUseCase: Symbol.for('SendEmailUseCase'),
  ConfirmUserAccountUseCase: Symbol.for('ConfirmUserAccountUseCase'),
  LoginUseCase: Symbol.for('LoginUseCase'),

  // Account
  CreateAccountUseCase: Symbol.for('CreateAccountUseCase'),
  UpdateAccountUseCase: Symbol.for('UpdateAccountUseCase'),
  DeleteAccountUseCase: Symbol.for('DeleteAccountUseCase'),
  GetAccountsUseCase: Symbol.for('GetAccountsUseCase'),

  // Transaction
  CreateTransactionUseCase: Symbol.for('CreateTransactionUseCase'),
  DeleteTransactionUseCase: Symbol.for('DeleteTransactionUseCase'),
  EditTransactionUseCase: Symbol.for('EditTransactionUseCase'),
  GetTransactionsUseCase: Symbol.for('GetTransactionsUseCase'),

  // Category
  CreateCategoryUseCase: Symbol.for('CreateCaregoryUseCase'),
  UpdateCategoryUseCase: Symbol.for('UpdateCategoryUseCase'),
  DeleteCategoryUseCase: Symbol.for('DeleteCategoryUseCase'),
  GetCategoriesUseCase: Symbol.for('GetCategoriesUseCase'),

  // Budget
  CreateBudgetUseCase: Symbol.for('CreateBudgetUseCase'),
  UpdateBudgetUseCase: Symbol.for('UpdateBudgetUseCase'),
  DeleteBudgetUseCase: Symbol.for('DeleteBudgetUseCase'),
  GetBudgetsUseCase: Symbol.for('GetBudgetsUseCase')
}
