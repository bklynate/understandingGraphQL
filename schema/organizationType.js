const graphql = require("graphql");
const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLString
} = graphql;

const OrganizationType = new GraphQLObjectType({
  name: "Organization",
  fields: () => ({
    id: { type: GraphQLString },
    ogName: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
      resolve: () => {
        return Date.now();
      }
    },
    updatedAt: {
      type: GraphQLString,
      resolve: () => {
        return Date.now();
      }
    }
  })
});

module.exports = OrganizationType
