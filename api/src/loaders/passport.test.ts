import Container from 'typedi'

import { UserService } from '@/services/UserService'

import { setupPassport } from './passport'

test('should not throw', () => {
  // Ideally we should not have to do this, but due to how passport strategies
  // work we cannot inject dependencies in a neat way.
  Container.set(UserService, {})

  expect(setupPassport()).toBeUndefined()
})
