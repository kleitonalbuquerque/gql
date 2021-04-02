const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const resolvers = require("./resolvers/index");

const schemaPath = "./schema/index.graphql";
const serer = new ApolloServer({
  typeDefs: importSchema(schemaPath),
  resolvers,
});

serer.listen().then(({ url }) => {
  console.log(`Executando em ${url}`);
});
