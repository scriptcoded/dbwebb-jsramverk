import pino from 'pino'
import Container, { Token } from 'typedi'

export const LOGGER_TOKEN = new Token<pino.Logger>('LOGGER')

export function setupLogger (): void {
  const logger = pino()

  Container.set(LOGGER_TOKEN, logger)
}
