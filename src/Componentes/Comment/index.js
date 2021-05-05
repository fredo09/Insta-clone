/**
*   Componente Comments 
**/

import React, { useEffect } from 'react';
import { Image, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_COMMENTS } from './../../gql/comment';
import { map, size } from 'lodash';
import AvatarImage from './../../assets/png/avatar.png';

import './Comment.scss';

export const Comment = ({ publication }) => {

    const { data, loading, startPolling, stopPolling } = useQuery(GET_COMMENTS, {
        variables: {
            idPublication: publication.id
        }
    });

    //realtime
    useEffect(() => {
        startPolling(10000);
        return () => {
            stopPolling();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stopPolling, stopPolling]);

    if (loading) return <Loader active inline='centered' className="spinner-comment">Cargando...</Loader>;

    const { getComments } = data;

    return (
        <div className="comments">
            {
                size(getComments) > 0 ?
                map(getComments, (comment, idx) => (
                    <Link to= { `/${comment.idUser.username}` } key={idx} className="comment" >
                        <Image src={comment.idUser.avatar || AvatarImage} avatar />
                        <div>
                            <p>{ comment.idUser.username }</p>
                            <p>{ comment.comment }</p>
                        </div> 
                    </Link>
                ))
                :
                (
                    <h1> No hay comentrios </h1>
                )
            }
        </div>
    )
}
