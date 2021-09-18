import { badRequest } from '@hapi/boom'
import { IsEmpty, IsString } from 'class-validator'
import { Request } from 'express'

import { validateRequest } from './validate'

function createExpressRequest () {
  return {} as Request
}

test('passes valid body', async () => {
  class Schema {
    @IsString()
    name: string
  }

  const req = createExpressRequest()

  req.body = {
    name: 'Foobar'
  }

  await expect(validateRequest(Schema, req)).resolves.toBeDefined()
})

test('rejects invalid body', async () => {
  class Schema {
    @IsString()
    name: string
  }

  const req = createExpressRequest()

  req.body = {}

  await expect(validateRequest(Schema, req)).rejects.toMatchObject({
    message: 'Validation failed'
  })
})
