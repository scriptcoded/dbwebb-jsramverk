import express from 'express'
import cors from 'cors'
import pinoLogger from 'express-pino-logger'
import Container from 'typedi'
import { json } from 'body-parser'

import { LOGGER_TOKEN } from './loaders/logger'
import { errorHandler } from './middleware/errorHandler'
import { buildRouter } from './router'

export function buildApp (): express.Express {
  const logger = Container.get(LOGGER_TOKEN)

  const app = express()

  app.use((errorHandler()))

  app.use(json())

  app.use(pinoLogger(
    logger
  ))

  app.use(cors())

  app.use(buildRouter())

  return app
}
