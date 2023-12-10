import { NextFunction, Request, Response } from 'express'
import { AppError } from '../common/errors/application.error'

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Error:', error)

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message
    })
  }

  return res.status(500).json({
    message: 'Something went wrong'
  })
}
