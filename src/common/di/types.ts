export const TYPES = {
  // User
  CreateUserWithEmailUseCase: Symbol.for('CreateUserWithEmailUseCase'),
  UserRepository: Symbol.for('UserRepository'),
  SendEmailUseCase: Symbol.for('SendEmailUseCase'),
  ConfirmAccountUseCase: Symbol.for('ConfirmAccountUseCase'),
  LoginUseCase: Symbol.for('LoginUseCase'),

  // Depot
  CreateDepotUseCase: Symbol.for('CreateDepotUseCase'),
  UpdateDepotUseCase: Symbol.for('UpdateDepotUseCase'),
  DeleteDepotUseCase: Symbol.for('DeleteDepotUseCase'),

  // Financial Movement
  CreateFinancialMovementUseCase: Symbol.for('CreateFinancialMovementUseCase'),
  DeleteFinancialMovementUseCase: Symbol.for('DeleteFinancialMovementUseCase'),
  EditFinancialMovementUseCase: Symbol.for('EditFinancialMovementUseCase')
}
