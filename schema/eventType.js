const graphql = require("graphql");
const axios = require("axios");

const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;
const { GraphQLDateTime } = require("graphql-iso-date");

const OrganizationType = require("./organizationType");

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    datetime: {
      type: GraphQLString
    },
    description: { type: GraphQLString },
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    },
    organization: {
      type: OrganizationType,
      resolve(parentValue, args) {
        return Organization.findById(parentValue.organizationId)
      }
    }
  })
});

module.exports = EventType;
