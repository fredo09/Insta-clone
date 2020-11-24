/**
*   Page User 
**/

import React from 'react';
import { Profile } from './../../Componentes/User/Profile';
import { useParams } from 'react-router-dom';

export const User = () => {

    const params = useParams();

    return(
        <>
            <Profile username={params.username}/>
        </>
    );
}
