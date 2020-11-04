/**
*   Trabajando con Graphql para mandar informacion al back 
**/
import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
    mutation register($input: UserInput ) {
    register(input : $input) {
        id
        name
        username
        email
        password
        createAt
    }
}
`;

//Mutation de login
export const LOGIN_USER = gql`
    mutation login($input : LoginInput) {
    login(input: $input){
        token
    }
}
`;