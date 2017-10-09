const graphql = require("graphql");
const { GraphQLSchema } = graphql;
const query = require("./RootQueryType");
const mutation = require("./mutations");

module.exports = new GraphQLSchema({
  query,
  mutation
});
