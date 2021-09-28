import { RequestHandler } from 'express'
import session from 'express-session'

import { Config } from '@/loaders/config'

export let sessionMiddleware: RequestHandler

export const createSessionMiddleware = (config: Config): void => {
  sessionMiddleware = session({
    secret: config.appKeys,
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: config.isProduction ? 'none' : undefined,
      secure: config.isProduction
    },
    proxy: config.isProduction
  })
}
