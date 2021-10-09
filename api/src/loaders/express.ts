import { createServer, Server } from 'http'

import express from 'express'
import { json } from 'body-parser'
import Container, { Token } from 'typedi'
import pinoLogger from 'express-pino-logger'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import { graphqlHTTP } from 'express-graphql'
import { GraphQLSchema } from 'graphql'

import { errorHandler } from '@/middleware/errorHandler'
import { buildRouter } from '@/router'
import { createSessionMiddleware, sessionMiddleware } from '@/middleware/session'
import { RootQueryType } from '@/graphql/root'

import { CONFIG_TOKEN } from './config'
import { LOGGER_TOKEN } from './logger'

export const EXPRESS_TOKEN = new Token<express.Express>('EXPRESS')
export const HTTP_TOKEN = new Token<Server>('HTTP')

export function setupExpress (): void {
  const config = Container.get(CONFIG_TOKEN)
  const logger = Container.get(LOGGER_TOKEN)

  const app = express()

  const httpServer = createServer(app)

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

  createSessionMiddleware(config)
  app.use(sessionMiddleware)

  app.set('trust proxy', 2)

  app.use(passport.initialize())
  app.use(passport.session())

  app.use(buildRouter())

  app.use('/graphql', graphqlHTTP({
    schema: new GraphQLSchema({
      query: RootQueryType
    }),
    graphiql: !config.isProduction
  }))

  app.use(errorHandler())

  Container.set(EXPRESS_TOKEN, app)
  Container.set(HTTP_TOKEN, httpServer)
}
