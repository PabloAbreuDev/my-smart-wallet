import { NextFunction, Request, Response } from 'express'
import { Schema, ZodError, ZodIssue } from 'zod'

export function validateRequest(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Bad Request',
          errors: error.issues.map((item: ZodIssue) => {
            return item.message
          })
        })
      }

      next(error)
    }
  }
}
