import express from 'express'
import asyncRouter from 'express-promise-router'
import Container from 'typedi'

import { AuthController } from './controllers/AuthController'

export function buildRouter (): express.Router {
  const authController = Container.get(AuthController)

  const router = asyncRouter()

  router.post('/auth/register', authController.register)
  router.post('/auth/login', authController.login)
  router.get('/auth/me', authController.me)

  return router
}
