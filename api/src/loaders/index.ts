import { loadConfig } from './config'
import { setupExpress } from './express'
import { setupLogger } from './logger'
import { connectMongoose } from './mongoose'
import { setupPassport } from './passport'
import { setupSocket } from './socket'
import { setupSendgrid } from './sendgrid'

export async function load (): Promise<void> {
  loadConfig()
  setupLogger()
  await connectMongoose()

  setupPassport()

  setupExpress()

  setupSocket()

  setupSendgrid()
}
