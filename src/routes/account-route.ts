import { Router } from 'express'
import { AccountsController } from '../controllers/accounts.controller'
import {
  createAccountUseCase,
  deleteAccountUsecase,
  getAccountsUseCase,
  updateAccountUseCase
} from '../common/di/composition-root'
import { validateRequest } from '../middleware/zod-validator'
import { createAccountRequestSchema } from './schemas/create-account'
import { updateAccountRequestSchema } from './schemas/update-account'
import { isAuthenticated } from '../loaders/passport'

const accountRouter = Router()
const accountController = new AccountsController(
  createAccountUseCase,
  updateAccountUseCase,
  deleteAccountUsecase,
  getAccountsUseCase
)
accountRouter.post(
  '/',
  isAuthenticated,
  validateRequest(createAccountRequestSchema),
  accountController.createAccount
)
accountRouter.put(
  '/:id',
  isAuthenticated,
  validateRequest(updateAccountRequestSchema),
  accountController.updateAccount
)
accountRouter.delete('/:id', isAuthenticated, accountController.deleteAccount)
accountRouter.get('/', isAuthenticated, accountController.getAccounts)
export default accountRouter
