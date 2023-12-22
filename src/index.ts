import 'reflect-metadata'
import 'express-async-errors'
import express, { Request, Response } from 'express'
import { initExpress } from './loaders/express'
import { environmentVariables } from './common/environment'
import { initMongoDB } from './loaders/mongodb'
import { logger } from './utils/logger'
import { initPassport } from './loaders/passport'

const app = express()

initExpress(app)

const port = environmentVariables.api.port

app.get('/', (req: Request, res: Response) => {
  res.send('Api is online!')
})

app.listen(port, async () => {
  await initMongoDB()
  logger.info(`App is running on port ${port}`)
})
