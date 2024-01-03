import { Router } from 'express'
import {
  createTransactionUseCase,
  deleteTransactionUseCase,
  editTransactionUseCase,
  getTransactionsUseCase,
  transactionsController
} from '../common/di/composition-root'
import { TransactionsController } from '../controllers/transactions.controller'
import { validateRequest } from '../middleware/zod-validator'
import { createTransactionRequestSchema } from './schemas/create-transaction'
import { editTransactionRequestSchema } from './schemas/edit-transaction'
import { isAuthenticated } from '../loaders/passport'

const transactionRouter = Router()

transactionRouter.post(
  '/',
  isAuthenticated,
  validateRequest(createTransactionRequestSchema),
  transactionsController.createTransaction
)

transactionRouter.delete(
  '/:id',
  isAuthenticated,
  transactionsController.deleteTransaction
)

transactionRouter.put(
  '/:id',
  isAuthenticated,
  validateRequest(editTransactionRequestSchema),
  transactionsController.editTransaction
)

transactionRouter.get(
  '/',
  isAuthenticated,
  transactionsController.getTransaction
)

export default transactionRouter
