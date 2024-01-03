import { Request, Response } from 'express'

export type ControllerInterface = (
  request: Request,
  response: Response
) => Promise<Response<any, Record<string, any>>>
