import "reflect-metadata"
import 'express-async-errors'
import express, { Request, Response } from 'express'
import responseError from "./middleware/response-error"
import { connectDatabase } from "./modules/mongodb"
import userRouter from "./routes/user-route"

const app = express()


app.use(express.json())
app.use("/users", userRouter)
app.use(responseError)
app.get("/", (req: Request, res: Response)=>{
    res.send("Hello World!")
})

const port = 3000

app.listen(port, async ()=>{
    await connectDatabase()
    console.log(`App is running on port ${port}`)
})