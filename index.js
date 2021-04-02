const { ApolloServer, gql } = require("apollo-server");

const perfis = [
  {
    id: 1,
    nome: "Comum",
  },
  {
    id: 2,
    nome: "Administrador",
  },
];

const usuarios = [
  {
    id: 1,
    nome: "João Silva",
    email: "jsilva@zemail.com",
    idade: 30,
    perfil_id: 1,
  },
  {
    id: 2,
    nome: "Luiz Paulo F de Albuquerque",
    email: "lpa@zemail.com",
    idade: 38,
    perfil_id: 2,
  },
  {
    id: 3,
    nome: "Mariana Oliveira de Albuquerque",
    email: "marioa@zemail.com",
    idade: 22,
    perfil_id: 1,
  },
];

const typeDefs = gql`
  scalar Date

  type Perfil {
    id: Int
    nome: String
  }

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
    perfil: Perfil
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
    perfis: [Perfil]
    perfil(id: Int): Perfil
  }
`;

const resolvers = {
  Produto: {
    precoComDesconto(produto) {
      if (produto.desconto) {
        return produto.preco * (1 - produto.desconto);
      } else {
        produto.preco;
      }
    },
  },
  Usuario: {
    salario(usuario) {
      return usuario.salario_real;
    },
    perfil(usuario) {
      const sels = perfis.filter((p) => p.id === usuario.perfil_id);
      return sels ? sels[0] : null;
    },
  },
  Query: {
    ola() {
      return "Bom dia!";
    },
    horaAtual() {
      let time = new Date();
      // return time.toString()
      return time;
    },
    usuarioLogado() {
      return {
        id: 1,
        nome: "Mariana Futura TI",
        email: "mariana@email.com",
        idade: 1,
        salario_real: 10000,
        vip: true,
      };
    },
    produtoEmDestaque() {
      return {
        nome: "Notebook",
        preco: 5000,
        desconto: 0.1,
      };
    },
    numerosMegaSena() {
      const crescente = (a, b) => a - b;
      numbers = Array(6)
        .fill(0)
        .map((n) => parseInt(Math.random() * 60 + 1))
        .sort(crescente);
      console.log(numbers);
      return numbers;
    },
    usuarios() {
      return usuarios;
    },
    usuario(_, { id }) {
      const selecionados = usuarios.filter((u) => u.id === id);
      return selecionados ? selecionados[0] : null;
    },
    perfis() {
      return perfis;
    },
    perfil(_, { id }) {
      const selecionados = perfis.filter((p) => p.id === id);
      return selecionados ? selecionados[0] : null;
    },
  },
};

const serer = new ApolloServer({
  typeDefs,
  resolvers,
});

serer.listen().then(({ url }) => {
  console.log(`Executando em ${url}`);
});
