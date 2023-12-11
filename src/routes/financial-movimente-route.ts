import { Router } from 'express'
import { createFinancialMovementUseCase } from '../common/di/composition-root'
import { FinancialMovementsController } from '../controllers/movements.controller'
import { auth } from '../middleware/auth'
import { validateRequest } from '../middleware/zod-validator'
import { createFinancialMovementRequestSchema } from './schemas/create-financial-movement'

const financialMovementRouter = Router()

const financialMovementController = new FinancialMovementsController(
  createFinancialMovementUseCase
)

financialMovementRouter.post(
  '/',
  auth,
  validateRequest(createFinancialMovementRequestSchema),
  financialMovementController.createFinancialMovements
)

export default financialMovementRouter
