/**
 *  Componente UserNotFound 
**/

import React from 'react';
import { Link } from 'react-router-dom';

import './UserNotFound.scss';

export const UserNotFound = () => {
    return(
        <div className="user-not-found">
            <p>Usuario no encontrado</p>
            <p>
                Es posible que el usuario halla sido elimido.
            </p>
            <Link to="/"> Volver al Inicio </Link>
        </div>
    );
}

