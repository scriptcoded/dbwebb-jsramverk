import Container from 'typedi'

import { setupLogger, LOGGER_TOKEN } from './logger'

beforeEach(() => {
  Container.reset()
})

test('should load logger', () => {
  setupLogger()

  expect(typeof Container.get(LOGGER_TOKEN)).toBe('object')
  expect(typeof Container.get(LOGGER_TOKEN).info).toBe('function')
})
