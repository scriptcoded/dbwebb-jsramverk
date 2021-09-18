import { isMongoError } from './mongoose'
import { mongoErrorFactory } from './mongoose.factory'

test('ignores standard errors', () => {
  const error = new Error()

  expect(isMongoError(error)).toBe(false)
})

test('detects Mongoose errors', () => {
  const error = mongoErrorFactory()

  expect(isMongoError(error)).toBe(true)
})

test('ignores specific Mongoose errors', () => {
  const error = mongoErrorFactory(2)

  expect(isMongoError(error, 1)).toBe(false)
})

test('detects specific Mongoose errors', () => {
  const error = mongoErrorFactory(2)

  expect(isMongoError(error, 2)).toBe(true)
})
