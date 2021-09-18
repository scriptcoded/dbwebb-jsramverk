import Container from 'typedi'

import { loadConfig, CONFIG_TOKEN } from './config'

// Make sure we restore process.env before each test
let origEnv: NodeJS.ProcessEnv

beforeAll(() => {
  origEnv = { ...process.env }
})

beforeEach(() => {
  process.env = { ...origEnv }
  Container.remove(CONFIG_TOKEN)
})

test('should load config', () => {
  process.env.PORT = '4000'
  process.env.APP_KEYS = 'x'
  process.env.DATABASE_URL = 'x'

  loadConfig()

  expect(typeof Container.get(CONFIG_TOKEN)).toBe('object')

  expect(Container.get(CONFIG_TOKEN)).toMatchObject({
    port: '4000'
  })
})

test('should throw for missing environment variables', () => {
  expect(() => loadConfig()).toThrow()
})
