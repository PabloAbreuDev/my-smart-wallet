import { Router } from 'express'
import {
  createTransactionUseCase,
  deleteTransactionUseCase,
  editTransactionUseCase,
  getTransactionsUseCase
} from '../common/di/composition-root'
import { TransactionsController } from '../controllers/transactions.controller'
import { auth } from '../middleware/auth'
import { validateRequest } from '../middleware/zod-validator'
import { createTransactionRequestSchema } from './schemas/create-transaction'
import { editTransactionRequestSchema } from './schemas/edit-transaction'
import { isAuthenticated } from '../loaders/passport'

const transactionRouter = Router()

const transactionController = new TransactionsController(
  createTransactionUseCase,
  deleteTransactionUseCase,
  editTransactionUseCase,
  getTransactionsUseCase
)

transactionRouter.post(
  '/',
  isAuthenticated,
  validateRequest(createTransactionRequestSchema),
  transactionController.createTransaction
)

transactionRouter.delete(
  '/:id',
  isAuthenticated,
  transactionController.deleteTransaction
)

transactionRouter.put(
  '/:id',
  isAuthenticated,
  validateRequest(editTransactionRequestSchema),
  transactionController.editTransaction
)

transactionRouter.get(
  '/',
  isAuthenticated,
  transactionController.getTransaction
)

export default transactionRouter
