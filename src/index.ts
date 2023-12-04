import "reflect-metadata"
import express, { Request, Response } from 'express'

const app = express()

app.get("/", (req: Request, res: Response)=>{
    res.send("Hello World!")
})

const port = 3000

app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})