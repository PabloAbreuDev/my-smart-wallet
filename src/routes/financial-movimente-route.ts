import { Router } from 'express'
import {
  createFinancialMovementUseCase,
  deleteFinancialMovementUseCase
} from '../common/di/composition-root'
import { FinancialMovementsController } from '../controllers/movements.controller'
import { auth } from '../middleware/auth'
import { validateRequest } from '../middleware/zod-validator'
import { createFinancialMovementRequestSchema } from './schemas/create-financial-movement'

const financialMovementRouter = Router()

const financialMovementController = new FinancialMovementsController(
  createFinancialMovementUseCase,
  deleteFinancialMovementUseCase
)

financialMovementRouter.post(
  '/',
  auth,
  validateRequest(createFinancialMovementRequestSchema),
  financialMovementController.createFinancialMovements
)

financialMovementRouter.delete(
  '/:id',
  auth,
  financialMovementController.deleteFinancialMovement
)

export default financialMovementRouter
