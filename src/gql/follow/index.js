/**
*   Querys and Mutations gql Follow
**/
import { gql } from '@apollo/client';

//Ver si hay un follow
export const IS_FOLLOW = gql `
    query isFollow ($username: String!) {
        isFollow(username: $username)
    }
`;

//Seguir Usuarios
export const FOLLOW = gql`
    mutation follow ($username : String!) {
        follow(username : $username)
    }
`;

//Dejar de seguir usuarios
export const UN_FOLLOW = gql`
    mutation unFollow ($username: String!) {
        unFollow (username: $username)
    }
`;

//Mostrar los seguidores del un Usuario
export const GET_FOLLOWERS = gql`
    query getFollowers ($username: String!) {
        getFollowers(username: $username){
            name
            username
            avatar
        }
    }
`;

//Mostrar los usuarios que sigue un usuario
export const GET_FOLLOWEDS = gql`
    query getFolloweds($username: String!) {
        getFolloweds(username: $username){
            name
            username
            avatar       
        }
    }
`;
