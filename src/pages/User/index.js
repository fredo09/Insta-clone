/**
*   Page User 
**/

import React from 'react';
import { Profile } from './../../Componentes/Profile';
import { useParams } from 'react-router-dom';

export const User = () => {

    const params = useParams();

    return(
        <>
            <Profile username={params.username}/>
        </>
    );
}
