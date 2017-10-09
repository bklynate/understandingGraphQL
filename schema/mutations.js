const graphql = require("graphql");
const axios = require("axios");
const LocationType = require("./locationType");

const {
  GraphQLObjectType,
  GraphQLString
} = graphql;

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addLocation: {
      type: LocationType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        latitude: { type: GraphQLString },
        longitude: { type: GraphQLString },
        organizationId: { type: GraphQLString },
        createdAt: {
          type: GraphQLString,
          resolve: () => {
            return Date.now();
          }
        }
      },
      resolve(
        parentValue,
        { id, name, address, latitude, longitude, createdAt }
      ) {
        return axios
          .post(`http://localhost:3000/locations`, {
            id,
            name,
            address,
            latitude,
            longitude,
            createdAt
          })
          .then(response => response.data);
      }
    }
  }
});

module.exports = mutation;
