import { gql } from '@apollo/client';



export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
  
      user {
        email
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation SaveBook( $bookId: ID!, $title: String!, $description: String, $authors: [String], $image: String, $link: String) {
    saveBook(bookId: $bookId, title: $title, description: $description, authors: $authors, image: $image, link: $link) {
      email
      username
      savedBooks {
        title
      }
    }
  }
`;


export const REMOVE_BOOK = gql`
mutation RemoveBook($userId: ID!, $bookId: ID) {
  removeBook(userId: $userId, bookId: $bookId) {
    _id
    email
    savedBooks {
      title
      bookId
    }
  }
}`;

