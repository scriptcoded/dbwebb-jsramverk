import { connect } from 'mongoose'
import Container from 'typedi'

import { CONFIG_TOKEN } from './config'

export async function connectMongoose (): Promise<void> {
  const config = Container.get(CONFIG_TOKEN)

  await connect(config.databaseURL, {
    authSource: 'admin'
  })
}
