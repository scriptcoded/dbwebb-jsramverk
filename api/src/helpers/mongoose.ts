// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function isMongoError (err: any, code?: number): boolean {
  if (err?.name === 'MongoServerError') {
    if (code == null) {
      return true
    } else {
      return err.code === code
    }
  }

  return false
}
