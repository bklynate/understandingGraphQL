const graphql = require("graphql");
const mongoose = require("mongoose");
const Location = mongoose.model("Location");
const Organization = mongoose.model("Organization");
const Event = mongoose.model("Event");
const LocationType = require("./locationType");
const OrganizationType = require("./organizationType");
const EventType = require("./eventType");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    organization: {
      type: OrganizationType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(_, { id }) {
        return Location.find(id);
      }
    },
    event: {
      type: EventType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(_, { id }) {
        return Event.findById(id);
      }
    },
    location: {
      type: LocationType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(_, { id }) {
        return Location.findById(id);
      }
    },
    locations: {
      type: new GraphQLList(LocationType),
      resolve() {
        return Location.find({});
      }
    },
    organizations: {
      type: new GraphQLList(OrganizationType),
      resolve() {
        return Organization.find({});
      }
    },
    events: {
      type: new GraphQLList(EventType),
      resolve() {
        return Event.find({});
      }
    }
  }
});

module.exports = RootQuery;
