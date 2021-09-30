import express from 'express'
import asyncRouter from 'express-promise-router'
import Container from 'typedi'

import { AuthController } from './controllers/AuthController'
import { UserController } from './controllers/UserController'
import { DocumentController } from './controllers/DocumentController'

export function buildRouter (): express.Router {
  const authController = Container.get(AuthController)
  const userController = Container.get(UserController)
  const documentController = Container.get(DocumentController)

  const router = asyncRouter()

  router.post('/auth/register', authController.register)
  router.post('/auth/login', authController.login)
  router.post('/auth/logout', authController.logout)
  router.get('/auth/me', authController.me)

  router.get('/users', userController.getUsers)

  router.get('/documents', documentController.getAll)
  router.get('/documents/:id', documentController.getOne)
  router.post('/documents', documentController.create)
  router.patch('/documents/:id', documentController.update)
  router.delete('/documents/:id', documentController.delete)

  return router
}
