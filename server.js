const express = require("express");
const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema");
const app = express();

// Replace with your mongoLab URI
// const MONGO_URI = '';
// if (!MONGO_URI) {
//   throw new Error('You must provide a MongoLab URI');
// }

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Am I Alive..?");
});
