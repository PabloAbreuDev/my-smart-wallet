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
import { isAuthenticated } from '../loaders/passport'

const budgetRouter = Router()

const budgetsController = new BudgetsController(
  createBudgetUseCase,
  updateBudgetUseCase,
  deleteBudgetUseCase,
  getBudgetsUseCase
)

budgetRouter.post(
  '/',
  isAuthenticated,
  validateRequest(createBudgetRequestSchema),
  budgetsController.createBudget
)

budgetRouter.put(
  '/:id',
  isAuthenticated,
  validateRequest(updateBudgetRequestSchema),
  budgetsController.updateBudget
)

budgetRouter.delete('/:id', isAuthenticated, budgetsController.deleteBudget)

budgetRouter.get('/', isAuthenticated, budgetsController.getBudgets)

export default budgetRouter
