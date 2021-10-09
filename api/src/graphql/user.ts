import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a user',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    username: { type: GraphQLNonNull(GraphQLString) }
  })
})
