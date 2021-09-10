import { Service } from 'typedi'
import argon2 from 'argon2'

import { User, UserModel } from '@/models/User'

export interface CreateUserInput {
  username: string;
  password: string;
}

@Service()
export class UserService {
  async createUser (data: CreateUserInput): Promise<User> {
    const password = await argon2.hash(data.password)

    const user = UserModel.create({
      username: data.username,
      password
    })

    return user
  }
}
