import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors/validation.error";

export default function responseError(
  error: Error,
  request: Request,
  response: Response,
  _next: NextFunction
): Response {
    console.log(error)

    if(error instanceof ValidationError){
        return response.status(error.statusCode).json({
            status: 'error',
            issues: error.issues
        })
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
}
