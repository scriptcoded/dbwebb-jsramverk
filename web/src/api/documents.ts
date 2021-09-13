import { httpClient } from './HttpClient'

export function createDocument (data: any) {
  return httpClient.post('/documents', data)
}

export function fetchDocuments () {
  return httpClient.get('/documents')
}

export function updateDocument (id: string, data: any) {
  return httpClient.patch(`/documents/${id}`, data)
}
