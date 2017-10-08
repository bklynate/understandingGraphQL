const graphql = require("graphql");
const axios = require("axios");
// const moment = require("moment");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
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
      type: OrganizationType,
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
      type: OrganizationType,
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
    },
  }
});

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

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
