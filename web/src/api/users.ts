import { httpClient } from './HttpClient'

export function fetchUsers () {
  return httpClient.get('/users')
}
