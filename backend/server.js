require("dotenv").config();
require("colors");
const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");

const db = require("./config/connection");
const typeDefs = require("./schemas/typeDefs");
const resolvers = require("./schemas/resolvers");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`.magenta);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`.green
      );
    });
  });
};

startApolloServer(typeDefs, resolvers);
