import { Router } from 'express'
import { CategoriesController } from '../controllers/categories.controller'
import {
  createCategoryUseCase,
  deleteCategoryUseCase,
  updateCategoryUseCase
} from '../common/di/composition-root'
import { auth } from '../middleware/auth'
import { validateRequest } from '../middleware/zod-validator'
import { createCategoryRequestSchema } from './schemas/create-category'
import { updateCategoryRequestSchema } from './schemas/update-category'

const categoryRouter = Router()

const categoryController = new CategoriesController(
  createCategoryUseCase,
  updateCategoryUseCase,
  deleteCategoryUseCase
)

categoryRouter.post(
  '/',
  auth,
  validateRequest(createCategoryRequestSchema),
  categoryController.createCategory
)

categoryRouter.put(
  '/:id',
  auth,
  validateRequest(updateCategoryRequestSchema),
  categoryController.updateCategory
)

categoryRouter.delete('/:id', auth, categoryController.deleteCategory)

export default categoryRouter
