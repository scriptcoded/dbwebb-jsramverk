import { badRequest } from '@hapi/boom'
import { ClassConstructor, plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { Request } from 'express'

export async function validateRequest<T extends ClassConstructor<any>> (cls: T, req: Request): Promise<InstanceType<T>> {
  const dataClass = plainToClass(cls, req.body)

  console.log(dataClass)

  const errors = await validate(dataClass, {
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true
  })

  if (errors.length > 0) {
    const sendableErrors = errors.map(e => ({
      property: e.property,
      value: e.value,
      constraints: e.constraints
    }))

    throw badRequest('Validation failed', {
      errors: sendableErrors
    })
  }

  return dataClass
}
