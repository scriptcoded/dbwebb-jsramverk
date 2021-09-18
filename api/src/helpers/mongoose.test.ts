import { isMongoError } from './mongoose'

class MongoError extends Error {
  code?: number
}

function createMongoError (code?: number): MongoError {
  const error = new MongoError()
  error.name = 'MongoServerError'

  if (code) {
    error.code = code
  }

  return error
}

test('ignores standard errors', () => {
  const error = new Error()

  expect(isMongoError(error)).toBe(false)
})

test('detects Mongoose errors', () => {
  const error = createMongoError()

  expect(isMongoError(error)).toBe(true)
})

test('ignores specific Mongoose errors', () => {
  const error = createMongoError(2)

  expect(isMongoError(error, 1)).toBe(false)
})

test('detects specific Mongoose errors', () => {
  const error = createMongoError(2)

  expect(isMongoError(error, 2)).toBe(true)
})
