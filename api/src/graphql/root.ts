import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'
import Container from 'typedi'
import { Request } from 'express'
import { unauthorized } from '@hapi/boom'

import { DocumentService } from '@/services/DocumentService'
import { AuthenticatedRequest } from '@/interfaces'
import { documentSchema } from '@/models/Document'

import { DocumentType } from './document'

export const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    document: {
      type: DocumentType,
      description: 'A single document',
      args: {
        id: { type: GraphQLNonNull(GraphQLString) }
      },
      async resolve (parent, args, origReq: Request) {
        const req = origReq as AuthenticatedRequest
        if (!req.user) { throw unauthorized() }

        const documentService = Container.get(DocumentService)
        const document = await documentService.getDocument({
          documentID: args.id,
          userID: req.user._id
        })

        return document
      }
    },
    documents: {
      type: GraphQLList(DocumentType),
      description: 'List of all documents',
      async resolve (parent, args, origReq: Request) {
        const req = origReq as AuthenticatedRequest
        if (!req.user) { throw unauthorized() }

        const documentService = Container.get(DocumentService)
        const documents = await documentService.getDocuments({
          userID: req.user._id
        })

        console.log('HELLO', documents)

        return documents
      }
    }
  })
})