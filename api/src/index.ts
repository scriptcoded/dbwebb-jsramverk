import 'reflect-metadata'

import Container from 'typedi'

import { load } from './loaders'
import { CONFIG_TOKEN } from './loaders/config'
import { HTTP_TOKEN } from './loaders/express'
import { LOGGER_TOKEN } from './loaders/logger'

async function start () {
  // Run all loaders
  await load()

  const config = Container.get(CONFIG_TOKEN)
  const logger = Container.get(LOGGER_TOKEN)

  // Create the Express app instance
  const httpServer = Container.get(HTTP_TOKEN)

  // Start the app
  httpServer.listen(config.port, () => {
    logger.info(`Server started on port ${config.port}`)
  })
}

// Make sure to catch errors when starting the application.
start()
  .catch(e => console.error('Error while bootstrapping the application', e))
