import { Service } from 'typedi'
import { Request, Response } from 'express'
import { IsOptional, IsString } from 'class-validator'

import { validateRequest } from '@/helpers/validate'
import { auth } from '@/middleware/auth'
import { DocumentService } from '@/services/DocumentService'
import { AuthenticatedRequest } from '@/interfaces'

class CreateDocumentDTO {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  content?: string
}

class UpdateDocumentDTO {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  content?: string

  @IsString({
    each: true
  })
  @IsOptional()
  collaboratorIDs?: string[]
}

@Service()
export class DocumentController {
  constructor (
    private documentService: DocumentService
  ) {}

  public getAll = [
    auth(),
    async (origReq: Request, res: Response): Promise<void> => {
      const req = origReq as AuthenticatedRequest
      const documents = await this.documentService.getDocuments({
        userID: req.user._id
      })

      res.send({
        data: documents
      })
    }
  ]

  public getOne = [
    auth(),
    async (origReq: Request, res: Response): Promise<void> => {
      const req = origReq as AuthenticatedRequest
      const document = await this.documentService.getDocument({
        documentID: req.params.id,
        userID: req.user._id
      })

      res.send({
        data: document
      })
    }
  ]

  public create = [
    auth(),
    async (origReq: Request, res: Response): Promise<void> => {
      const req = origReq as AuthenticatedRequest
      const body = await validateRequest(CreateDocumentDTO, req)

      const document = await this.documentService.createDocument({
        userID: req.user._id,
        ...body
      })

      res.send({
        data: document
      })
    }
  ]

  public update = [
    auth(),
    async (origReq: Request, res: Response): Promise<void> => {
      const req = origReq as AuthenticatedRequest
      const body = await validateRequest(UpdateDocumentDTO, req)

      const document = await this.documentService.updateDocument({
        documentID: req.params.id,
        userID: req.user._id,
        ...body
      })

      res.send({
        data: document
      })
    }
  ]

  public delete = [
    auth(),
    async (origReq: Request, res: Response): Promise<void> => {
      const req = origReq as AuthenticatedRequest

      await this.documentService.deleteDocument({
        documentID: req.params.id,
        userID: req.user._id
      })

      res.send({ })
    }
  ]

  public renderPDF = [
    auth(),
    async (origReq: Request, res: Response): Promise<void> => {
      const req = origReq as AuthenticatedRequest
      const pdfDocument = await this.documentService.renderPDF({
        documentID: req.params.id,
        userID: req.user._id
      })

      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', 'attachment; filename=document.pdf')

      res.send(pdfDocument)
    }
  ]
}
