import { Service } from 'typedi'
import argon2 from 'argon2'
import { notFound } from '@hapi/boom'

import { User, UserModel } from '@/models/User'
import { isMongoError } from '@/helpers/mongoose'

export interface CreateUserInput {
  username: string;
  password: string;
}

@Service()
export class UserService {
  async createUser (data: CreateUserInput): Promise<User> {
    const password = await argon2.hash(data.password)

    try {
      const user = await UserModel.create({
        username: data.username,
        password
      })

      return user
    } catch (e) {
      if (isMongoError(e, 11000)) {
        throw notFound('Username already taken')
      }

      throw e
    }
  }
}
