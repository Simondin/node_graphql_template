import { makeExecutableSchema } from '@graphql-tools/schema'
import { requireGQLResolvers, requireGQLDefinitions } from '../utils/tools'

const resolvers = requireGQLResolvers(`${__dirname}/resolvers`)
const typeDefs = requireGQLDefinitions(`${__dirname}/defs`)

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

export default schema