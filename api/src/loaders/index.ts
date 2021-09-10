import { loadConfig } from './config'
import { setupLogger } from './logger'
import { connectMongoose } from './mongoose'

export async function load (): Promise<void> {
  loadConfig()
  setupLogger()
  await connectMongoose()
}
