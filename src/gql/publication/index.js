/**
*   Graphql Comments
**/

import { gql } from '@apollo/client';

export const PUBLISH = gql`
    mutation publish ($file: Upload) {
        publish(file: $file) {
            status
            urlFile
        }
    }
`;

export const GET_PUBLICATION = gql`
    query getPublications($username: String!){
        getPublications(username: $username){
            id
            idUser
            file
            typeFile
            createAt
        }
    }
`;

export const GET_FEED_PUBLICATION = gql`
    query getPublicationsFeed {
        getPublicationsFeed{
            id
            idUser{
                id
                name
                username
                avatar
            }
            file
            typeFile
            createAt
        }
    }    
`;
