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

const transactionRouter = Router()

const transactionController = new TransactionsController(
  createTransactionUseCase,
  deleteTransactionUseCase,
  editTransactionUseCase,
  getTransactionsUseCase
)

transactionRouter.post(
  '/',
  auth,
  validateRequest(createTransactionRequestSchema),
  transactionController.createTransaction
)

transactionRouter.delete('/:id', auth, transactionController.deleteTransaction)

transactionRouter.put(
  '/:id',
  auth,
  validateRequest(editTransactionRequestSchema),
  transactionController.editTransaction
)

transactionRouter.get('/', auth, transactionController.getTransaction)

export default transactionRouter
