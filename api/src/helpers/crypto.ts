import { randomBytes } from 'crypto'

export function generateToken (size = 48): Promise<string> {
  return new Promise((resolve, reject) => {
    randomBytes(size, (err, buf) => {
      if (err) {
        reject(err)
        return
      }

      resolve(buf.toString('hex'))
    })
  })
}
