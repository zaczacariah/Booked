const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if(context.user) {
          return User.findOne({_id: context.user._id})
      }
      throw AuthenticationError;
    }
    // classes: async () => {
    //   return await Class.find({}).populate('professor');
    // },
    // class: async (parent, args) => {
    //   return await Class.findById(args.id);
    // },
    // professors: async () => {
    //   return await Professor.find({}).populate('classes');
    // }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, {bookId, userId, authors, description, title, image, link }, context) => {
   
        if(context.user){
          return await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { savedBooks: {bookId, authors, description, title, image, link }}},
            { new: true, runValidators: true }
          );
        }
        throw AuthenticationError;
   
    },
    removeBook: async (parent, {userId, bookId}, context) => {
      if(context.user){
          return User.findOneAndUpdate(
          {_id: userId},
          {$pull: {savedBooks: {bookId: bookId}}},
          {new: true}
      )
      }
    }
  }
};

module.exports = resolvers;
