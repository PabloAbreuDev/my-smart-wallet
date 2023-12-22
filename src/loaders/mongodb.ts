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

export async function closeMongoDB() {
  try {
    await mongoose.connection.close()
    logger.info('Database connection closed!')
    return true
  } catch (error) {
    logger.error('Error closing database connection:', error)
    throw error
  }
}
