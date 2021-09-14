import { Service } from 'typedi'
import { notFound } from '@hapi/boom'

import { UserModel } from '@/models/User'
import { Document, DocumentModel } from '@/models/Document'

export interface GetDocumentsInput {
  userID: string;
}

export interface GetDocumentInput {
  documentID: string;
  userID: string;
}

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

export interface DeleteDocumentInput {
  documentID: string;
  userID: string;
}

@Service()
export class DocumentService {
  async getDocuments (data: GetDocumentsInput): Promise<Document[]> {
    const { userID } = data

    const user = await UserModel.findById(userID)
    if (!user) throw notFound('User not found')

    return user.documents
  }

  async getDocument (data: GetDocumentInput): Promise<Document> {
    const { documentID, userID } = data

    const user = await UserModel.findById(userID)
    const document = user?.documents.find(d => d.id === documentID)
    if (!document || !user) throw notFound('Document not found')

    return document
  }

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

    const user = await UserModel.findById(userID)
    console.log(user?.documents)
    const document = user?.documents.find(d => d._id.toString() === documentID.toString())
    if (!document || !user) throw notFound('Document not found')

    document.name = name ?? document.name
    document.content = content ?? document.content

    await user.save()

    return document
  }

  async deleteDocument (data: DeleteDocumentInput): Promise<void> {
    // It's not ideal to handle access control inside the service, but it's a
    // lot easier than building an access control layer above.
    const { documentID, userID } = data

    const user = await UserModel.findById(userID)
    console.log(user?.documents)
    const document = user?.documents.find(d => d._id.toString() === documentID.toString())
    if (!document || !user) throw notFound('Document not found')

    user.documents = user.documents.filter(d => d._id.toString() !== documentID.toString())

    await user.save()
  }
}
