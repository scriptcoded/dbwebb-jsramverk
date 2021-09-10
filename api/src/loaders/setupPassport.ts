import passport from 'passport'

import { UserModel } from '../models/User'
import { localStrategy } from '../strategies/localStrategy'

export function setupPassport (): void {
  passport.use(localStrategy)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  passport.serializeUser((user: any, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    UserModel.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err))
  })
}
