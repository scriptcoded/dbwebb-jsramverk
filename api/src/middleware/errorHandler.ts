import { badRequest, Boom, internal } from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'

export function errorHandler () {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  return (err: any, req: Request, res: Response, next: NextFunction): void => {
    let errToSend: Boom = internal()

    if (err.isBoom) {
      errToSend = err
    }

    if (err.type === 'entity.parse.failed') {
      errToSend = badRequest(err.message)
    }

    res
      .status(errToSend.output.statusCode)
      .set(errToSend.output.headers)
      .send({
        error: {
          ...errToSend.output.payload,
          data: errToSend.data
        }
      })

    if (errToSend.isServer) {
      throw err
    }
  }
}
