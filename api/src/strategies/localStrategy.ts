import { Strategy as LocalStrategy } from 'passport-local'
import Container from 'typedi'
import { unauthorized } from '@hapi/boom'

import { UserService } from '@/services/UserService'

export const localStrategy = new LocalStrategy(
  (username, password, done) => {
    const userService = Container.get(UserService)

    userService.findUserWithPassword({
      username,
      password
    })
      .then((user) => {
        if (user) {
          done(null, user)
        } else {
          done(unauthorized('Invalid credentials'))
        }
      })
      .catch(err => done(err))
  }
)
