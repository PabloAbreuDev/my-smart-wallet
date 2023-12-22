import express, { Express, Request, Response } from 'express'
import accountRouter from '../routes/account-route'
import budgetRouter from '../routes/budget-route'
import categoryRouter from '../routes/category-route'
import transactionRouter from '../routes/transaction-route'
import userRouter from '../routes/user-route'
import { errorHandler } from '../middleware/error-handler'
import session from 'express-session'
import { initPassport } from './passport'

export async function initExpress(app: Express) {
  app.use(express.json())
  app.use(
    session({
      secret: 'seu_segredo',
      resave: true,
      saveUninitialized: true
    })
  )
  initPassport(app)

  app.use('/users', userRouter)
  app.use('/accounts', accountRouter)
  app.use('/transactions', transactionRouter)
  app.use('/categories', categoryRouter)
  app.use('/budgets', budgetRouter)
  app.use(errorHandler)
}
