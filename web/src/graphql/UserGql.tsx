import { gql } from "@apollo/client"

export type User = {
    id: String,
    email: String,
    username: String,
    password: String,
}

export type LoginResponse = {
    status: Number,
    access_token: String,
    data: User,
}

/*
User Signup Request:
{
  "user": {
    "email": "jie@gmail.com",
    "username": "jiejie",
    "password": "limyeejie888"
  },
}
*/
export const userSignupMutation = gql`
    mutation createUser($user: createUserInput!) {
        createUser(user: $user) {
            id
            email
            password
            username
        }
    }
`;


/**
User Login Request:
{
  "user": {
    "email": "jie@gmail.com",
    "password": "limyeejie888"
  },
}
 */
export const userLoginMutation = gql`
    mutation userLogin($user: userLoginInput!) {
        userLogin(user: $user) {
            status
            access_token
            data {
                id
                email
                username
                password
            }
        }
    }
`;

/*
No need any data
it will be clear your jwt cookie to implement logout function
*/
export const userLogoutMutation = gql`
    mutation Mutation {
        logout
    }
`;

export const getUserByTokenQuery = gql`
    query Query {
        me {
            id
            username
            email
        }
    }
`;