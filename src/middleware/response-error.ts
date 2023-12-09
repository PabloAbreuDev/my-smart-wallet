import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../common/errors/validation.error";

export default function responseError(
  error: Error,
  request: Request,
  response: Response,
  _next: NextFunction
): Response {
    console.log(error)

    if(error instanceof ValidationError){
        return response.status(error.statusCode).json({
            message: "Operation failed",
            errors: error.issues.map((item)=>{
                return item.message
            }),
        })
    }

    return response.status(500).json({
        message: error.message,
    })
}
