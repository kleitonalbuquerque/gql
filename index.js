const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  scalar Date

  type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float
  }

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
    produtoEmDestaque: Produto
  }
`

const resolvers = {
  Produto: {
    precoComDesconto(produto) {
      if(produto.desconto) {
        return produto.preco * (1 - produto.desconto)
      } else {
        produto.preco
      }
    }
  },
  Usuario : {
    salario(usuario) {
      return usuario.salario_real
    }
  },
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
        salario_real: 10000,
        vip: true
      }
    },
    produtoEmDestaque() {
      return {
        nome: 'Notebook',
        preco: 5000,
        desconto: 0.1
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