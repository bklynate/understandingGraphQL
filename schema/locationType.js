const graphql = require("graphql");
const axios = require("axios");
const OrganizationType = require("./organizationType");

const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;

const LocationType = new GraphQLObjectType({
  name: "Location",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    latitude: { type: GraphQLString },
    longitude: { type: GraphQLString },
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

module.exports = LocationType;
