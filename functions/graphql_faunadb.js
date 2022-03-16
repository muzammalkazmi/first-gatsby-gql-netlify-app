const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require('faunadb')
const q = faunadb.query

const typeDefs = gql `
type Query{
    message:string
}
`
const resolvers = {
    Query: {
        message: async(parent, args, context) => {
            try {
                var client = new faunadb.Client({ secret: 'fnAEhyyAAzACS3lxxjF7VE_y1v8a2k08CvT5yG7b' })
                var result = await client.query(q.Get(q.Ref(q.Collection('customers'), 101)))
                return result.data.firstName
            } catch (error) {
                return error.toString()
            }
        }
    }
}
const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true
})
exports.handler = server.createHandler();