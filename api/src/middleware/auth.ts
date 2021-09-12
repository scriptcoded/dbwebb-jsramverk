import { unauthorized } from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'

export function auth () {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (req.user) {
      next()
    } else {
      next(unauthorized())
    }
  }
}
