const User = require("../models/User");

const resolvers = {
  Query: {
    getUser: async (_, { metaMaskId }) => {
      let foundUser = await User.findOne({ metaMaskId });

      if (!foundUser) {
        throw new Error(`User does not exist with Meta Mask ID: ${metaMaskId}`);
      }
      return foundUser;
    },
    getAllUsers: async (_) => {
      return await User.find({});
    },
  },
  Mutation: {
    createUser: async (_, { metaMaskId }) => {
      const user = new User({ metaMaskId });
      await user.save();
      return user;
    },
  },
};
module.exports = resolvers;
