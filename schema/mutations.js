const graphql = require("graphql");
const axios = require("axios");
const mongoose = require("mongoose");
const LocationType = require("./locationType");
const OrganizationType = require("./organizationType");
const Location = mongoose.model("Location");
const Organization = mongoose.model("Organization");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;
const { GraphQLDateTime } = require("graphql-iso-date");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addOrganization: {
      type: OrganizationType,
      args: {
        id: { type: GraphQLString },
        ogName: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
      },
      resolve(
        parentValue,
        { id, ogName, createdAt, updatedAt}
      ) {
        return (new Organization({ id, ogName, createdAt, updatedAt })).save();
      }
    },
    addLocation: {
      type: LocationType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        latitude: { type: GraphQLString },
        longitude: { type: GraphQLString },
        organizationId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(
        parentValue,
        { id, name, address, latitude, longitude, createdAt, organizationId }
      ) {
        return (new Location({ id, name, address, latitude, longitude, createdAt, organizationId })).save();
      }
    },
    editLocation: {
      type: LocationType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        latitude: { type: GraphQLString },
        longitude: { type: GraphQLString },
        organizationId: { type: GraphQLString },
        updatedAt: {
          type: GraphQLString
        }
      },
      async resolve(_, args) {
        await Location.findByIdAndUpdate(args.id, {...args });
        return Location.findById(args.id);
      }
    }
  }
});

module.exports = mutation;
