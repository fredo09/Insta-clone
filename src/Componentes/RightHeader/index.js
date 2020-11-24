/**
*   Componente RightHeader Opciones
**/

import React from "react";
import { Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from './../../gql/user';
import AvatarImage from './../../assets/png/avatar.png'
import useAuth from './../../hooks/useContext';

import './RightHeader.scss';

export const RightHeader = () => {

    const { auth } = useAuth();

    //Obteniendo informacion del usuario
    const { loading, error, data } = useQuery(GET_USER,{
        variables: {username: auth.username}
    });

    if ( loading || error ) return null;  

    const { getUser } = data;

    return(
        <>
            <div className="right-header">
                <Link to="/">
                    <Icon name="home" />
                </Link>
                <Icon name="plus" />
                <Link to={`/${auth.username}`}>
                    <Image src={getUser.avatar ? getUser.avatar : AvatarImage} avatar/>
                </Link>
            </div>
        </>
    );
}