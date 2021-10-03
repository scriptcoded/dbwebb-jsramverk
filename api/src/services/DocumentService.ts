import { Service } from 'typedi'
import { notFound } from '@hapi/boom'
import { Types } from 'mongoose'

import { User, UserModel } from '@/models/User'
import { Document, DocumentModel } from '@/models/Document'

export interface GetDocumentsInput {
  userID: string;
}

export interface GetCollaboratingDocumentsInput {
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
  collaboratorIDs?: string[];
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
      .populate('documents.collaborators')
    if (!user) throw notFound('User not found')

    const allUsers = await UserModel.find()
      .populate('documents.collaborators')
    const allDocuments = allUsers.flatMap(u => u.documents)
    const collabDocuments = allDocuments.filter(d => d.collaborators.some(c => c._id.toString() === userID.toString()))

    return [
      ...user.documents,
      ...collabDocuments
    ]
  }

  async getDocument (data: GetDocumentInput): Promise<Document> {
    const { documentID, userID } = data

    const { user, document } = await this.findUserAndDocument(documentID, userID)

    if (!document || !user) {
      throw notFound('Document not found')
    }

    return document
  }

  async createDocument (data: CreateDocumentInput): Promise<Document> {
    const { userID, name, content } = data

    const user = await UserModel.findById(userID)
      .populate('documents.collaborators')
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
    const { documentID, userID, name, content, collaboratorIDs } = data

    const { user, document } = await this.findUserAndDocument(documentID, userID)

    if (!document || !user) {
      throw notFound('Document not found')
    }

    document.name = name ?? document.name
    document.content = content ?? document.content

    if (data.collaboratorIDs && user._id.toString() === userID.toString()) {
      const newCollaborators = await UserModel.find({ _id: { $in: collaboratorIDs } })
      document.collaborators = newCollaborators
    }

    await user.save()

    return document
  }

  async deleteDocument (data: DeleteDocumentInput): Promise<void> {
    // It's not ideal to handle access control inside the service, but it's a
    // lot easier than building an access control layer above.
    const { documentID, userID } = data

    const { user, document } = await this.findUserAndDocument(documentID, userID)

    if (!document || !user) {
      throw notFound('Document not found')
    }

    user.documents = user.documents.filter(d => d._id.toString() !== documentID.toString())

    await user.save()
  }

  private async findUserAndDocument (documentID: string, userID?: string) {
    const allUsers = await UserModel.find()
      .populate('documents.collaborators')
    let user: typeof allUsers[0] | undefined
    let document: Document | undefined

    for (const u of allUsers) {
      const userDoc = u.documents.find(d => d._id.toString() === documentID)

      if (userDoc) {
        if (userID !== undefined) {
          const isOwner = u._id.toString() === userID.toString()
          const isCollaborator = userDoc?.collaborators.some(c => c._id.toString() === userID.toString())

          if (!isOwner && !isCollaborator) {
            continue
          }
        }

        user = u
        document = userDoc
        break
      }
    }

    return { user, document }
  }
}
