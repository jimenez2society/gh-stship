const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    metaMaskId: String!
  }

  type Query {
    getUser(metaMaskId: String!): User

    getAllUsers: [User]!
  }

  type Mutation {
    createUser(metaMaskId: String!): User
  }
`;
module.exports = typeDefs;
