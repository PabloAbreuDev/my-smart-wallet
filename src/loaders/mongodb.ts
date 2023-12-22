import mongoose from 'mongoose'
import { environmentVariables } from '../common/environment'
import { logger } from '../utils/logger'

export async function initMongoDB() {
  try {
    await mongoose.connect(environmentVariables.database.urlConnection)
    logger.info('Database connected!')
    return true
  } catch (error) {
    logger.error(error)
    throw error
  }
}
