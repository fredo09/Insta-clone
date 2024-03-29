/**
*   Graphql Comments 
**/

import { gql } from '@apollo/client';

export const ADD_COMMENTS = gql`
    mutation addComment ($input: CommentInput){
        addComment(input : $input) {
            idPublication
            comment
        }
    }
`;

export const GET_COMMENTS = gql`
    query getComments($idPublication : ID!){
        getComments(idPublication: $idPublication){
            idPublication
            idUser{
                username
                avatar
            }
            comment
            createAt
        }
    }
`;
