
export type MongoError = Error & { code?: number }

export function mongoErrorFactory (code?: number) {
  const error = {
    name: 'MongoServerError',
    code
  } as MongoError

  return error
}
