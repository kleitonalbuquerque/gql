const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  scalar Date

  type Usuario {
    id: ID!
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
  }

  # Pontos de entrada da API
  type Query {
    ola: String!
    horaAtual: Date!
    usuarioLogado: Usuario
  }
`

const resolvers = {
  Query: {
    ola() {
      return 'Bom dia!'
    },
    horaAtual() {
      let time = new Date
      // return time.toString()
      return time
    },
    usuarioLogado() {
      return {
        id: 1,
        nome: 'Mariana Futura TI',
        email: 'mariana@email.com',
        idade: 1,
        salario: 10000,
        vip: true
      }
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