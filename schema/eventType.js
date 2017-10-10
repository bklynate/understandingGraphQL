const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;

const OrganizationType = require("./organizationType");

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    datetime: { type: GraphQLString },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    organization: {
      type: OrganizationType,
      resolve(parentValue, _) {
        return Organization.findById(parentValue.organizationId);
      }
    }
  })
});

module.exports = EventType;
