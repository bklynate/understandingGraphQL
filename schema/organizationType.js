const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;

const OrganizationType = new GraphQLObjectType({
  name: "Organization",
  fields: () => ({
    id: { type: GraphQLString },
    ogName: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
});
// Keeping this here as a reference:
// resolve: date => new Date().toISOString()
module.exports = OrganizationType;
