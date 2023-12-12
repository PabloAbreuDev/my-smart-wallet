import { Router } from 'express'
import {
  createFinancialMovementUseCase,
  deleteFinancialMovementUseCase,
  editFinancialMovementUseCase,
  getFinancialMovementsUseCase
} from '../common/di/composition-root'
import { FinancialMovementsController } from '../controllers/movements.controller'
import { auth } from '../middleware/auth'
import { validateRequest } from '../middleware/zod-validator'
import { createFinancialMovementRequestSchema } from './schemas/create-financial-movement'
import { editFinancialMovementRequestSchema } from './schemas/edit-financial-movement'

const financialMovementRouter = Router()

const financialMovementController = new FinancialMovementsController(
  createFinancialMovementUseCase,
  deleteFinancialMovementUseCase,
  editFinancialMovementUseCase,
  getFinancialMovementsUseCase
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

financialMovementRouter.put(
  '/:id',
  auth,
  validateRequest(editFinancialMovementRequestSchema),
  financialMovementController.editFinancialMovement
)

financialMovementRouter.get(
  '/',
  auth,
  financialMovementController.getFinancialMovemenets
)

export default financialMovementRouter
