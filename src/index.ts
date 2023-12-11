import 'reflect-metadata'
import 'express-async-errors'
import express, { Request, Response } from 'express'
import { connectDatabaseLoader } from './loaders/mongodb'
import userRouter from './routes/user-route'
import { errorHandler } from './middleware/error-handler'
import depotRouter from './routes/depot-route'

const app = express()

app.use(express.json())
app.use('/users', userRouter)
app.use('/depots', depotRouter)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(errorHandler)

const port = 3000

app.listen(port, async () => {
  await connectDatabaseLoader()
  console.log(`App is running on port ${port}`)
})
