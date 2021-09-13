import { Service } from 'typedi'
import { notFound } from '@hapi/boom'
import { Document } from 'mongoose'

import { UserModel } from '@/models/User'
import { DocumentModel } from '@/models/Document'

export interface CreateDocumentInput {
  userID: string;
  name?: string;
  content?: string;
}

export interface UpdateDocumentInput {
  documentID: string;
  userID: string;
  name?: string;
  content?: string;
}

export interface GetDocumentsInput {
  userID: string;
}

@Service()
export class DocumentService {
  async createDocument (data: CreateDocumentInput): Promise<Document> {
    const { userID, name, content } = data

    const user = await UserModel.findById(userID)
    if (!user) throw notFound('User not found')

    const document = new DocumentModel({
      name: name ?? 'New Document',
      content: content ?? 'Write something epic'
    })

    user.documents.push(document)

    await user.save()

    return document
  }

  async updateDocument (data: UpdateDocumentInput): Promise<Document> {
    // It's not ideal to handle access control inside the service, but it's a
    // lot easier than building an access control layer above.
    const { documentID, userID, name, content } = data

    const document = await DocumentModel.findById(documentID)
    const user = await document?.$parent()
    if (!document || user?.id !== userID) throw notFound('Document not found')

    document.name = name ?? document.name
    document.content = content ?? document.content

    await document.save()

    return document
  }

  async getDocuments (data: GetDocumentsInput): Promise<Document[]> {
    const { userID } = data

    const user = await UserModel.findById(userID)
    if (!user) throw notFound('User not found')

    return user.documents
  }
}
