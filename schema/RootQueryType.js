const graphql = require("graphql");
const axios = require("axios");
const LocationType = require("./locationType");
const OrganizationType = require("./organizationType");
const EventType = require("./eventType");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    organization: {
      type: OrganizationType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, { id }) {
        return axios
          .get(`http://localhost:3000/organizations/${id}`)
          .then(response => response.data);
      }
    },
    event: {
      type: EventType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, { id }) {
        return axios
          .get(`http://localhost:3000/events/${id}`)
          .then(response => response.data);
      }
    },
    location: {
      type: LocationType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, { id }) {
        return axios
          .get(`http://localhost:3000/locations/${id}`)
          .then(response => response.data);
      }
    },
    locations: {
      type: new GraphQLList(LocationType),
      resolve() {
        return axios
          .get(`http://localhost:3000/locations`)
          .then(response => response.data);
      }
    },
    organizations: {
      type: new GraphQLList(OrganizationType),
      resolve() {
        return axios
          .get(`http://localhost:3000/organizations`)
          .then(response => response.data);
      }
    }
  }
});

module.exports = RootQuery;
