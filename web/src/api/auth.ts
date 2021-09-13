import { httpClient } from './HttpClient'

export function login (data: any) {
  return httpClient.post('/auth/login', data)
}

export function register (data: any) {
  return httpClient.post('/auth/register', data)
}

export function logout (data: any) {
  return httpClient.post('/auth/logout', data)
}

export function getUser () {
  return httpClient.get('/auth/me')
}
