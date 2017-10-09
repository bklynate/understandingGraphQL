const graphql = require("graphql");
const axios = require("axios");

const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;
const OrganizationType = require("./organizationType");

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    date: {
      type: GraphQLString
    },
    time: {
      type: GraphQLString
    },
    description: { type: GraphQLString },
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
    },
    organization: {
      type: new GraphQLNonNull(OrganizationType),
      resolve(parentValue, args) {
        return axios
          .get(
            `http://localhost:3000/organizations/${parentValue.organizationId}`
          )
          .then(response => response.data);
      }
    }
  })
});

module.exports = EventType;
