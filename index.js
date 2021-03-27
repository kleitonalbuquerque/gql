const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  # Pontos de entrada da API
  type Query {
    ola: String
  }
`

const resolvers = {
  Query: {
    ola() {
      return 'Bom dia!'
    }
  }
}

const serer = new ApolloServer({
  typeDefs,
  resolvers
})

serer.listen().then(({ url }) => {
  console.log(`Executando em ${url}`)
})