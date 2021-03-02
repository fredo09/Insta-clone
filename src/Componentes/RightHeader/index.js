/**
*   Componente RightHeader Opciones
**/

import React, { useState } from "react";
import { Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from './../../gql/user';
import { ModalUPload } from './../ModalUPload';
import AvatarImage from './../../assets/png/avatar.png'
import useAuth from './../../hooks/useContext';

import './RightHeader.scss';

export const RightHeader = () => {

    //State Modal
    const [ showModal, setShowModal ] = useState(false);

    //Contexto de la aplicaion este caso para la autenticacion
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
                <Icon name="plus" onClick={() => setShowModal(true)}/>
                <Link to={`/${auth.username}`}>
                    <Image src={getUser.avatar ? getUser.avatar : AvatarImage} avatar/>
                </Link>
            </div>
            <ModalUPload setShow={setShowModal} show={showModal}/>
        </>
    );
}