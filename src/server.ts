import 'reflect-metadata'
import 'express-async-errors'
import cors from 'cors'
import express, { Express, Request, Response } from 'express'
import session from 'express-session'
import { environmentVariables } from './common/environment'
import { closeMongoDB, initMongoDB } from './loaders/mongodb'
import { initPassport } from './loaders/passport'
import { errorHandler } from './middleware/error-handler'
import accountRouter from './routes/account-route'
import budgetRouter from './routes/budget-route'
import categoryRouter from './routes/category-route'
import transactionRouter from './routes/transaction-route'
import userRouter from './routes/user-route'
import { logger } from './utils/logger'
import { Server, createServer } from 'http'
import cookieParser from 'cookie-parser'

export class App {
  private app: Express
  private server: Server

  constructor() {
    this.app = express()
    this.server = createServer(this.app)
    this.initializeMiddlewares()
    this.initializeLoaders()
    this.initializeRoutes()
  }

  private async initializeMiddlewares() {
    this.app.use(express.json())
    this.app.use(express.urlencoded())

    this.app.use(cors({ origin: 'http://localhost:3001', credentials: true }))

    this.app.use(
      session({
        secret: environmentVariables.session.secret,
        resave: true,
        saveUninitialized: true
      })
    )

    this.app.use(cookieParser())
  }

  private async initializeLoaders() {
    initPassport(this.app)
    await initMongoDB()
  }

  private initializeRoutes() {
    this.app.use('/users', userRouter)
    this.app.use('/accounts', accountRouter)
    this.app.use('/transactions', transactionRouter)
    this.app.use('/categories', categoryRouter)
    this.app.use('/budgets', budgetRouter)
    this.app.use(errorHandler)

    this.app.get('/', (req: Request, res: Response) => {
      res.send('Api is online!')
    })
  }

  public async quit(): Promise<void> {
    await closeMongoDB()
    logger.info('Server is gracefully shutting down...')
    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close(err => {
          if (err) {
            return reject(err)
          }
          resolve(true)
        })
      })
    }
  }

  public startServer() {
    const port = environmentVariables.api.port

    this.app.listen(port, async () => {
      logger.info(`App is running on port ${port}`)
    })
  }
}
