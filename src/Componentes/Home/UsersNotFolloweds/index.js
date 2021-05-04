/**
*   Componente UsersNotFolloweds 
**/
import React from 'react';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { useQuery } from '@apollo/client';
import { GET_NOT_FOLLOWEDS } from './../../../gql/follow';
import ImageNotFound from './../../../assets/png/avatar.png';
import './UsersNotFolloweds.scss';

export const UsersNotFolloweds = () => {

    const { data, loading } = useQuery(GET_NOT_FOLLOWEDS);

    if (loading) return null;
    
    const { getNotFollowed } = data;

    return (
        <div className="user-not-followeds">
            <h3>Usuarios que quizas talvez conozcas</h3>
            { map(getNotFollowed, (user, idx) => {
                return (
                    <Link to={`/${user.username}`} key={ idx } className="user-not-followeds__user">
                        <Image src={user.avatar || ImageNotFound} avatar />
                        <span> {user.username} </span>
                    </Link>
                );
            })}
        </div>
    )
}
