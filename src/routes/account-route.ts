import { Router } from 'express'
import { AccountsController } from '../controllers/accounts.controller'
import {
  createAccountUseCase,
  deleteAccountUsecase,
  getAccountsUseCase,
  updateAccountUseCase
} from '../common/di/composition-root'
import { auth } from '../middleware/auth'
import { validateRequest } from '../middleware/zod-validator'
import { createAccountRequestSchema } from './schemas/create-account'
import { updateAccountRequestSchema } from './schemas/update-account'

const accountRouter = Router()
const accountController = new AccountsController(
  createAccountUseCase,
  updateAccountUseCase,
  deleteAccountUsecase,
  getAccountsUseCase
)
accountRouter.post(
  '/',
  auth,
  validateRequest(createAccountRequestSchema),
  accountController.createAccount
)
accountRouter.put(
  '/:id',
  auth,
  validateRequest(updateAccountRequestSchema),
  accountController.updateAccount
)
accountRouter.delete('/:id', auth, accountController.deleteAccount)
accountRouter.get('/', auth, accountController.getAccounts)
export default accountRouter
