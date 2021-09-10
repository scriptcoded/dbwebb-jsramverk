import 'reflect-metadata'

import Container from 'typedi'

import { buildApp } from './app'
import { load } from './loaders'
import { CONFIG_TOKEN } from './loaders/config'
import { LOGGER_TOKEN } from './loaders/logger'
import { errorHandler } from './middleware/errorHandler'

async function start () {
  // Run all loaders
  await load()

  const config = Container.get(CONFIG_TOKEN)
  const logger = Container.get(LOGGER_TOKEN)

  // Create the Express app instance
  const app = buildApp()

  // Start the app
  app.listen(config.port, () => {
    logger.info(`Server started on port ${config.port}`)
  })

  app.use(errorHandler())
}

// Make sure to catch errors when starting the application.
start()
  .catch(e => console.error('Error while bootstrapping the application', e))
