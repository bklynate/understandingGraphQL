const graphql = require("graphql");
const { GraphQLSchema } = graphql;
const query = require("./rootQueryType");
const mutation = require("./mutations");

module.exports = new GraphQLSchema({
  query,
  mutation
});
