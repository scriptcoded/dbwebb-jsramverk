import { loadConfig } from './config'
import { setupLogger } from './logger'
import { connectMongoose } from './mongoose'
import { setupPassport } from './setupPassport'

export async function load (): Promise<void> {
  loadConfig()
  setupLogger()
  await connectMongoose()

  setupPassport()
}
