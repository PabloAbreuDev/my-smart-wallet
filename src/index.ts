import 'reflect-metadata'
import 'express-async-errors'
import express, { Request, Response } from 'express'
import { connectDatabaseLoader } from './loaders/mongodb'
import userRouter from './routes/user-route'
import { errorHandler } from './middleware/error-handler'
import accountRouter from './routes/account-route'
import { logger } from './utils/logger'
import transactionRouter from './routes/transaction-route'
import categoryRouter from './routes/category-route'
import budgetRouter from './routes/budget-route'

const app = express()

app.use(express.json())

app.use('/users', userRouter)
app.use('/accounts', accountRouter)
app.use('/transactions', transactionRouter)
app.use('/categories', categoryRouter)
app.use('/budgets', budgetRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(errorHandler)

const port = 3000

app.listen(port, async () => {
  await connectDatabaseLoader()
  logger.info(`App is running on port ${port}`)
})
