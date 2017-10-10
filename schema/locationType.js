const graphql = require("graphql");
const mongoose = require("mongoose");
const OrganizationType = require("./organizationType");
const Organization = mongoose.model("Organization");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;

const LocationType = new GraphQLObjectType({
  name: "Location",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    latitude: { type: GraphQLString },
    longitude: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: {
      type: GraphQLString,
      resolve(location) {
        return location.updatedAt;
      }
    },
    organization: {
      type: OrganizationType,
      resolve(parentValue, _) {
        return Organization.findById(parentValue.organizationId);
      }
    }
  })
});

module.exports = LocationType;
