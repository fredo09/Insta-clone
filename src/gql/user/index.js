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

//  Query GET_USER
export const GET_USER = gql`
    query getUser($id: ID, $username: String ){
        getUser(id: $id, username: $username ){
            id
            name
            username
            email
            sitioWeb
            description
            avatar
        }
    }
`;

//Mutation uploadAvatar
export const UPLOAD_AVATAR = gql`
    mutation uploadAvatar($file: Upload){
        uploadAvatar(file: $file ){
            status
            urlAvatar
        }
    }
`;

//Delete Avatar
export const DELETE_AVATAR = gql`
    mutation deleteAvatar {
        deleteAvatar
    }
`;

//Actualizar contraseña 
export const UPDATE_USER = gql`
    mutation updateUser ($input: UpdateUserInput){
        updateUser(input : $input)
    }
`;

//Bucar Usuarios
export const SEARCH = gql`
    query search($search: String) {
        search (search: $search) {
            name
            username
            avatar
        }
    }
`;
