import { Router } from 'express'
import { CategoriesController } from '../controllers/categories.controller'
import {
  categoriesController,
  createCategoryUseCase,
  deleteCategoryUseCase,
  getCategoriesUseCase,
  updateCategoryUseCase
} from '../common/di/composition-root'
import { validateRequest } from '../middleware/zod-validator'
import { createCategoryRequestSchema } from './schemas/create-category'
import { updateCategoryRequestSchema } from './schemas/update-category'
import { isAuthenticated } from '../loaders/passport'

const categoryRouter = Router()

categoryRouter.post(
  '/',
  isAuthenticated,
  validateRequest(createCategoryRequestSchema),
  categoriesController.createCategory
)

categoryRouter.put(
  '/:id',
  isAuthenticated,
  validateRequest(updateCategoryRequestSchema),
  categoriesController.updateCategory
)

categoryRouter.delete(
  '/:id',
  isAuthenticated,
  categoriesController.deleteCategory
)

categoryRouter.get('/', isAuthenticated, categoriesController.getCategories)

export default categoryRouter
