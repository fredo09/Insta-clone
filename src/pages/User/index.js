/**
*   Page User 
**/

import React, { useEffect } from 'react';
import { Profile } from './../../Componentes/User/Profile';
import { Publications } from './../../Componentes/Publications';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PUBLICATION } from './../../gql/publication';
import { size } from 'lodash';

export const User = () => {

    const params = useParams();

    //Obteniendo publicaiones 
    const { data, loading, startPolling, stopPolling} = useQuery(GET_PUBLICATION, {
        variables: { username: params.username }
    });

    //realTime para nuevas publicaciones
    useEffect(() => {
        startPolling(5000);
        return () => {
            stopPolling();
        };
    },[stopPolling, startPolling])

    if (loading) return null;

    //Obteninedo las publicaiones
    const { getPublications } = data;

    return(
        <>
            <Profile username={params.username} totalPublications={size(getPublications)}/>
            <Publications getPublications={getPublications}/>
        </>
    );
}
