import { httpClient } from './HttpClient'

export function createDocument (data: any) {
  return httpClient.post('/documents', data)
}

export function fetchDocuments () {
  return httpClient.get('/documents')
}

export function fetchDocument (id: string) {
  return httpClient.get(`/documents/${id}`)
}

export function updateDocument (id: string, data: any) {
  return httpClient.patch(`/documents/${id}`, data)
}

export function deleteDocument (id: string) {
  return httpClient.delete(`/documents/${id}`)
}
