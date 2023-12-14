import { Router } from 'express'
import {
  createBudgetUseCase,
  updateBudgetUseCase,
  deleteBudgetUseCase,
  getBudgetsUseCase
} from '../common/di/composition-root'
import { auth } from '../middleware/auth'
import { validateRequest } from '../middleware/zod-validator'
import { createBudgetRequestSchema } from './schemas/create-budget'
import { updateBudgetRequestSchema } from './schemas/update-budget'
import { BudgetsController } from '../controllers/budgets.controller'

const budgetRouter = Router()

const budgetsController = new BudgetsController(
  createBudgetUseCase,
  updateBudgetUseCase,
  deleteBudgetUseCase,
  getBudgetsUseCase
)

budgetRouter.post(
  '/',
  auth,
  validateRequest(createBudgetRequestSchema),
  budgetsController.createBudget
)

budgetRouter.put(
  '/:id',
  auth,
  validateRequest(updateBudgetRequestSchema),
  budgetsController.updateBudget
)

budgetRouter.delete('/:id', auth, budgetsController.deleteBudget)

budgetRouter.get('/', auth, budgetsController.getBudgets)

export default budgetRouter
