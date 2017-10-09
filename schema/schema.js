const graphql = require("graphql");
const { GraphQLSchema } = graphql;
const query = require("./RootQueryType");
const mutation = require("./RootQueryType");

module.exports = new GraphQLSchema({
  query,
  mutation
});
