import { httpClient } from './HttpClient'

export async function createDocument (createData: any = {}) {
  const args = `
    ${createData.name ? `name: "${createData.name}"` : ''}
    ${createData.content ? `content: "${createData.content}"` : ''}
  `.trim()

  const { data } = await httpClient.post('/graphql', {
    query: `{
      createDocument ${args ? `(${args})` : ''} {
        _id
        name
        content
        collaborators {
          _id
          username
        }
      }
    }`
  })

  return data.createDocument
}

export async function fetchDocuments () {
  const { data } = await httpClient.post('/graphql', {
    query: `{
      documents {
        _id
        name
        content
        collaborators {
          _id
          username
        }
      }
    }`
  })

  return data.documents
}

export async function fetchDocument (id: string) {
  const { data } = await httpClient.post('/graphql', {
    query: `{
      document (id: "${id}") {
        _id
        name
        content
        collaborators {
          _id
          username
        }
      }
    }`
  })

  return data.document
}

export async function updateDocument (id: string, updateData: any) {
  console.log(`{
    updateDocument (
      id: "${id}"
      ${updateData.name ? `name: "${updateData.name}"` : ''}
      ${updateData.content ? `content: "${updateData.content}"` : ''}
      ${updateData.collaboratorIDs ? `collaboratorIDs: ${JSON.stringify(updateData.collaboratorIDs)}` : ''}
    ) {
      _id
      name
      content
      collaborators {
        _id
        username
      }
    }
  }`)

  const { data } = await httpClient.post('/graphql', {
    query: `{
      updateDocument (
        id: "${id}"
        ${updateData.name ? `name: "${updateData.name}"` : ''}
        ${updateData.content ? `content: "${updateData.content}"` : ''}
        ${updateData.collaboratorIDs ? `collaboratorIDs: ${JSON.stringify(updateData.collaboratorIDs)}` : ''}
      ) {
        _id
        name
        content
        collaborators {
          _id
          username
        }
      }
    }`
  })

  return data.updateDocument
}

export async function deleteDocument (id: string) {
  const { data } = await httpClient.post('/graphql', {
    query: `{
      deleteDocument (id: "${id}") {
        _id
        name
        content
        collaborators {
          _id
          username
        }
      }
    }`
  })

  return data.deleteDocument
}

export async function inviteEmail (id: string, email: string) {
  return httpClient.post(`/documents/${id}/invite`, {
    email
  })
}
