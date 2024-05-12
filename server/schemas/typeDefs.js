const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    savedBook: [Book]
  }

  type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me(username: String!): User

  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth  
    saveBook(
      userId: ID!
      bookId: ID!
      authors: [String]
      description: String
      title: String!
      image: String
      link: String
    ): User
    removeBook(
      userId: ID!
      bookId: ID
    ) : User
  }

`;

module.exports = typeDefs;
