import { RequestHandler } from 'express'
import session from 'express-session'
import createRedisStore, { RedisStore } from 'connect-redis'
import { createClient } from 'redis'

import { Config } from '@/loaders/config'

export let sessionMiddleware: RequestHandler

export const createSessionMiddleware = (config: Config): void => {
  let store: RedisStore | undefined

  if (config.redisURL) {
    const RedisStoreConstructor = createRedisStore(session)

    const redisClient = createClient({
      url: config.redisURL
    })

    store = new RedisStoreConstructor({
      client: redisClient
    })
  }

  sessionMiddleware = session({
    store,
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
