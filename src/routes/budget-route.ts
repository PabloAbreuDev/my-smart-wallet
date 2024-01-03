import { Router } from 'express'
import { budgetsController } from '../common/di/composition-root'
import { validateRequest } from '../middleware/zod-validator'
import { createBudgetRequestSchema } from './schemas/create-budget'
import { updateBudgetRequestSchema } from './schemas/update-budget'
import { isAuthenticated } from '../loaders/passport'

const budgetRouter = Router()

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
