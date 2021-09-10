import { Service } from 'typedi'
import argon2 from 'argon2'
import { notFound } from '@hapi/boom'
import { LeanDocument } from 'mongoose'

import { User, UserModel } from '@/models/User'
import { isMongoError } from '@/helpers/mongoose'

export interface CreateUserInput {
  username: string;
  password: string;
}
export interface FindUserWithPasswordInput {
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

  async findUserWithPassword ({ username, password }: FindUserWithPasswordInput): Promise<LeanDocument<User> | null> {
    const user = await UserModel.findOne({
      username
    }).select('+password')

    if (!user) {
      return null
    }

    const passwordValid = await argon2.verify(user.password, password)

    if (!passwordValid) {
      return null
    }

    // Because we want to get a pure and lean version of the user for storing in
    // the session without doing multiple queries we use JSON.parse and
    // JSON.stringify.
    const leanUser = JSON.parse(JSON.stringify(user))

    return leanUser
  }
}
