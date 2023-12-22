import { Router } from 'express'
import { CategoriesController } from '../controllers/categories.controller'
import {
  createCategoryUseCase,
  deleteCategoryUseCase,
  getCategoriesUseCase,
  updateCategoryUseCase
} from '../common/di/composition-root'
import { auth } from '../middleware/auth'
import { validateRequest } from '../middleware/zod-validator'
import { createCategoryRequestSchema } from './schemas/create-category'
import { updateCategoryRequestSchema } from './schemas/update-category'
import { isAuthenticated } from '../loaders/passport'

const categoryRouter = Router()

const categoryController = new CategoriesController(
  createCategoryUseCase,
  updateCategoryUseCase,
  deleteCategoryUseCase,
  getCategoriesUseCase
)

categoryRouter.post(
  '/',
  isAuthenticated,
  validateRequest(createCategoryRequestSchema),
  categoryController.createCategory
)

categoryRouter.put(
  '/:id',
  isAuthenticated,
  validateRequest(updateCategoryRequestSchema),
  categoryController.updateCategory
)

categoryRouter.delete(
  '/:id',
  isAuthenticated,
  categoryController.deleteCategory
)

categoryRouter.get('/', isAuthenticated, categoryController.getCategories)

export default categoryRouter
