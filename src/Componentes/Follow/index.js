/**
*   Componente Follow 
**/

import React from 'react';
import { useQuery} from '@apollo/client';
import { IS_FOLLOW } from './../../gql/follow';
import useAuth from './../../hooks/useContext';

import './Follow.scss';

export const IsFollow = ({ user }) => {
    const { auth } = useAuth();

    const { data, loading, error} = useQuery(IS_FOLLOW,{
        variables: {
            username: user.username
        }
    });

    if (loading || error ) return null;

    console.log(data);
    const { isFollow } = data;

    const isFollowLayout = () => {
        if (isFollow) {
            if (auth.username !== user.username) {
                return (
                    <span className="span__follow">
                        Seguiendo
                    </span>
                );
            }
        } else {
            if (auth.username === user.username) {
                return (
                    <span className="span__follow">
                    </span>
                );
            } else {
                return (
                    <span className="span__follow">
                        Seguir
                    </span>
                );
            }
        }
    }

    return (
        <>
            {isFollowLayout()}
        </>
    )
}
