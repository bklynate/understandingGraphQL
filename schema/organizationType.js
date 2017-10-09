const graphql = require("graphql");
const axios = require("axios");
const { GraphQLDateTime } = require("graphql-iso-date");

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
      type: GraphQLString
      // resolve: date => new Date().toISOString()
    },
    updatedAt: {
      type: GraphQLString
      // resolve: date => new Date().toISOString()
    }
  })
});

module.exports = OrganizationType
