const { User } = require('../models');
const { signToken, AuthenticationError, authMiddleware } = require('../utils/auth');

const resolvers = {
  Query: {
  users: async () => {
    return User.find();
  },
  user: async (parent, {userId}) => {
    return User.findOne({_id: userId})
  },
  me: async (parent, args, context) => {
  
    if(context.user) {
        return User.findOne({_id: context.user._id}).populate('savedBooks')
    }
    throw AuthenticationError;
  }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = (await User.create(args)).populate('savedBooks');
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

    saveBook: async (parent, {bookId, authors, description=' ', title, image=' ', link=' ' }, context) => {

        if(context.user){

          return await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: {bookId, authors, description, title, image, link }}},
            { new: true, runValidators: true }
          ).populate('savedBooks');;
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
