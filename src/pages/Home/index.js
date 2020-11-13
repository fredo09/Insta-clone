/**
*   Page Home 
**/

import React from 'react';
import useAuth from './../../hooks/useContext';

import './Home.scss';

export const Home = () => {

    //Obteninedo el token del usuario logeado
    const authUser = useAuth();

    console.log(authUser);

    return(
        <div>
            <h1>Listo para empezar a construir webApp 🚀</h1>
        </div>
    );
}