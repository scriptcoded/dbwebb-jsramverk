import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'

import { UserType } from './user'

export const DocumentType = new GraphQLObjectType({
  name: 'Document',
  description: 'This represents a document',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    content: { type: GraphQLNonNull(GraphQLString) },
    collaborators: {
      type: GraphQLList(UserType),
      resolve: (document) => document.collaborators
    }
  })
})
