const express = require("express");
const models = require("./models");
const bodyParser = require("body-parser");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const mongo_url = "mongodb://localhost/eco_graphql"
const schema = require("./schema/schema");
const app = express();

// Replace with your mongoLab URI
// const MONGO_URI = '';
// if (!MONGO_URI) {
//   throw new Error('You must provide a MongoLab URI');
// }

mongoose.Promise = global.Promise;
mongoose.connect(mongo_url);
mongoose.connection
  .once("open", () => console.log("Connected to MongoDB instance."))
  .on("error", error => console.log("Error connecting to MongoDB:", error));

app.use(bodyParser.json());

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
