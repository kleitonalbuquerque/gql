const { ApolloServer, gql } = require('apollo-server')

const usuarios = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'jsilva@zemail.com',
    idade: 30
  },
  {
    id: 2,
    nome: 'Luiz Paulo F de Albuquerque',
    email: 'lpa@zemail.com',
    idade: 38
  },
  {
    id: 3,
    nome: 'Mariana Oliveira de Albuquerque',
    email: 'marioa@zemail.com',
    idade: 22
  }
]

const typeDefs = gql`
  scalar Date

  type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float    
  }

  type Usuario {
    id: Int
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
    numerosMegaSena: [Int!]!
    usuarios: [Usuario]
    usuario(id: Int): Usuario #definindo parametros na consulta retornando o id de um usuario
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
    },
    numerosMegaSena() {
      const crescente = (a, b) => a - b
      numbers = Array(6).fill(0).map(n => parseInt(Math.random() * 60 + 1)).sort(crescente)
      console.log(numbers)
      return numbers
    },
    usuarios() {
      return usuarios
    },
    usuario(_, { id }) {
      const selecionados = usuarios.filter(u => u.id === id)
      return selecionados ? selecionados[0] : null
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