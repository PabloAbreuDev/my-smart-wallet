import { Router } from 'express'
import { DepotsController } from '../controllers/depots.controller'
import {
  createDepot,
  deleteDepotUsecase,
  updateDepotUseCase
} from '../common/di/composition-root'
import { auth } from '../middleware/auth'
import { validateRequest } from '../middleware/zod-validator'
import { createDepotRequestSchema } from './schemas/create-depot'
import { updateDepotRequestSchema } from './schemas/update-depot'

const depotRouter = Router()
const depotController = new DepotsController(
  createDepot,
  updateDepotUseCase,
  deleteDepotUsecase
)
depotRouter.post(
  '/',
  auth,
  validateRequest(createDepotRequestSchema),
  depotController.createDepot
)
depotRouter.put(
  '/:id',
  auth,
  validateRequest(updateDepotRequestSchema),
  depotController.updateDepot
)
depotRouter.delete('/:id', auth, depotController.deleteDepot)
export default depotRouter
