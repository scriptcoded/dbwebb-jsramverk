import Container from 'typedi'

import { setupLogger, LOGGER_TOKEN } from './logger'

beforeEach(() => {
  Container.remove(LOGGER_TOKEN)
})

test('should load logger', () => {
  setupLogger()

  expect(typeof Container.get(LOGGER_TOKEN)).toBe('object')
  expect(typeof Container.get(LOGGER_TOKEN).info).toBe('function')
})

test('logger should not exist if not loaded', () => {
  expect(() => Container.get(LOGGER_TOKEN)).toThrowError('identifier was not found in the container')
})
