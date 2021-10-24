import argon2 from 'argon2'

import { mongoErrorFactory } from '@/helpers/mongoose.factory'
import { User, UserModel } from '@/models/User'

import { UserService } from './UserService'

let userService: UserService

const dummyUser: User = {
  _id: '1',
  username: 'foo',
  password: 'bar',
  documents: []
}

let hashedPassword: string

beforeAll(async () => {
  hashedPassword = await argon2.hash(dummyUser.password)
})

beforeEach(() => {
  userService = new UserService({} as any)
})

test('createUser should create user', async () => {
  UserModel.create = jest.fn(() => Promise.resolve(dummyUser)) as any

  const user = await userService.createUser({
    username: dummyUser.username,
    password: dummyUser.password
  })

  expect(user).toEqual(dummyUser)
})

test('createUser should reject duplicates', async () => {
  UserModel.create = jest.fn(() => Promise.reject(mongoErrorFactory(11000))) as any

  await expect(userService.createUser({
    username: dummyUser.username,
    password: dummyUser.password
  })).rejects.toMatchObject({
    message: 'Username already taken'
  })
})

test('findUserWithPassword should return user', async () => {
  const mockUser = {
    ...dummyUser,
    password: hashedPassword
  }

  UserModel.findOne = jest.fn(() => ({
    select: jest.fn(() => Promise.resolve(mockUser))
  })) as any

  const user = await userService.findUserWithPassword({
    username: dummyUser.username,
    password: dummyUser.password
  })

  expect(user).toEqual(mockUser)
})
