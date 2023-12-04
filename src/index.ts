import "reflect-metadata"
import 'express-async-errors'
import express, { Request, Response } from 'express'
import responseError from "./middleware/response-error"
import { UsersController } from "./controllers/users.controller"
import { CreateUser } from "./use-cases/create-user.usecase"

const app = express()

const userController = new UsersController(new CreateUser())

app.use(express.json())
app.post("/users", userController.createUser)
app.use(responseError)

app.get("/", (req: Request, res: Response)=>{
    res.send("Hello World!")
})

const port = 3000

app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})