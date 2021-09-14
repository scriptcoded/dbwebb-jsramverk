import { httpClient } from './HttpClient'

export function login (data: any) {
  return httpClient.post('/auth/login', data)
}

export function register (data: any) {
  return httpClient.post('/auth/register', data)
}

export function logout () {
  return httpClient.post('/auth/logout')
}

export function getUser () {
  return httpClient.get('/auth/me')
}
