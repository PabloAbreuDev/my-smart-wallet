import "reflect-metadata"
import 'express-async-errors'
import express, { Request, Response } from 'express'
import responseError from "./middleware/response-error"
import { UsersController } from "./controllers/users.controller"
import { connectDatabase } from "./modules/mongodb"
import { createUserWithEmail } from "./config/di/composition-root"

const app = express()
const userController = new UsersController(createUserWithEmail)

app.use(express.json())
app.post("/users", userController.createUser)
app.use(responseError)

app.get("/", (req: Request, res: Response)=>{
    res.send("Hello World!")
})

const port = 3000

app.listen(port, async ()=>{
    await connectDatabase()
    console.log(`App is running on port ${port}`)
})