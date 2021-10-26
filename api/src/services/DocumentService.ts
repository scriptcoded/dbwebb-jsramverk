import path from 'path'
import fs from 'fs'

import { Inject, Service } from 'typedi'
import { notFound } from '@hapi/boom'
import pdf from 'html-pdf'

import { UserModel } from '@/models/User'
import { Document, DocumentModel } from '@/models/Document'
import { generateToken } from '@/helpers/crypto'
import { Config, CONFIG_TOKEN } from '@/loaders/config'

import { EmailService } from './EmailService'

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

export interface InviteUserInput {
  documentID: string;
  userID: string;
  email: string;
}

export interface RenderPDFInput {
  documentID: string;
  userID: string;
}

@Service()
export class DocumentService {
  constructor (
    @Inject(CONFIG_TOKEN) private config: Config,
    private emailService: EmailService
  ) { }

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

  async deleteDocument (data: DeleteDocumentInput): Promise<Document> {
    // It's not ideal to handle access control inside the service, but it's a
    // lot easier than building an access control layer above.
    const { documentID, userID } = data

    const { user, document } = await this.findUserAndDocument(documentID, userID)

    if (!document || !user) {
      throw notFound('Document not found')
    }

    user.documents = user.documents.filter(d => d._id.toString() !== documentID.toString())

    await user.save()

    return document
  }

  private async findUserAndDocument (documentID: string, userID?: string, requireOwner = false) {
    const allUsers = await UserModel.find()
      .populate('documents.collaborators')
    let user: typeof allUsers[0] | undefined
    let document: Document | undefined

    for (const u of allUsers) {
      const userDoc = u.documents.find(d => d._id.toString() === documentID)

      if (userDoc) {
        if (userID !== undefined) {
          const isOwner = u._id.toString() === userID.toString()
          const isCollaborator = !requireOwner && userDoc?.collaborators.some(c => c._id.toString() === userID.toString())

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

  async inviteUser (data: InviteUserInput): Promise<{ document: Document; invitationToken: string }> {
    // It's not ideal to handle access control inside the service, but it's a
    // lot easier than building an access control layer above.
    const { documentID, userID, email } = data

    const { user, document } = await this.findUserAndDocument(documentID, userID, true)

    if (!document || !user) {
      throw notFound('Document not found')
    }

    const invitationToken = await generateToken()

    document.invitationTokens.push(invitationToken)

    await user.save()

    await this.emailService.sendInvite({
      email,
      sender: user.username,
      ctaLink: `${this.config.appURL}/#/register?token=${invitationToken}`
    })

    return {
      document,
      invitationToken
    }
  }

  async addUserWithToken (userID: string, token: string): Promise<void> {
    const allUsers = await UserModel.find()
      .populate('documents.collaborators')
    let user: typeof allUsers[0] | undefined
    let document: Document | undefined

    for (const u of allUsers) {
      const userDoc = u.documents.find(d => d.invitationTokens.includes(token))

      if (userDoc) {
        user = u
        document = userDoc
        break
      }
    }

    if (!document || !user) { return }

    document.invitationTokens = document.invitationTokens.filter(t => t !== token)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.collaborators = [...new Set([...document.collaborators, userID])]

    await user.save()
  }

  async renderPDF (data: RenderPDFInput): Promise<Buffer> {
    const { documentID, userID } = data

    const { user, document } = await this.findUserAndDocument(documentID, userID)

    if (!document || !user) {
      throw notFound('Document not found')
    }

    return new Promise<Buffer>((resolve, reject) => {
      fs.readFile(path.join(__dirname, '..', 'pdfAssets', 'style.css'), 'utf8', (err, style) => {
        if (err) {
          reject(err)
          return
        }

        const html = `
        <html>
          <head>
            <style>${style}</style>
          </head>
          <body>
            <h1 class="text-2xl prose border-b-2 pb-1 mb-5">${document.name}</h1>
            <div class="prose">
              ${document.content}
            </div>
          </body>
        </html>
        `

        pdf.create(html, {
          format: 'A4',
          border: {
            top: '15mm',
            bottom: '15mm',
            left: '10mm',
            right: '10mm'
          }
        })
          .toBuffer((err, buffer) => {
            if (err) {
              console.error('PDF rendering error', err)
              reject(err)
            } else {
              resolve(buffer)
            }
          })
      })
    })
  }
}
