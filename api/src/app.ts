import express from 'express'
import cors from 'cors'
import pinoLogger from 'express-pino-logger'
import Container from 'typedi'
import { json } from 'body-parser'
import passport from 'passport'
import session from 'express-session'

import { LOGGER_TOKEN } from './loaders/logger'
import { errorHandler } from './middleware/errorHandler'
import { buildRouter } from './router'
import { CONFIG_TOKEN } from './loaders/config'

export function buildApp (): express.Express {
  const config = Container.get(CONFIG_TOKEN)
  const logger = Container.get(LOGGER_TOKEN)

  const app = express()

  app.use((errorHandler()))

  app.use(json())

  app.use(pinoLogger(
    logger
  ))

  app.use(cors({
    // Bad practice, but OK for development
    origin: (origin, callback) => callback(null, origin),
    credentials: true
  }))

  app.use(session({
    secret: config.appKeys,
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: config.isProduction ? 'none' : undefined,
      secure: config.isProduction
    },
    proxy: config.isProduction
  }))

  app.set('trust proxy', 2)

  app.use(passport.initialize())
  app.use(passport.session())

  app.use(buildRouter())

  return app
}
