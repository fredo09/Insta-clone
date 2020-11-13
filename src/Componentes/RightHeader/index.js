/**
*   Componente RightHeader Opciones
**/

import React from "react";
import { Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Avatar from './../../assets/png/avatar.png'
import useAuth from './../../hooks/useContext';

import './RightHeader.scss';

export const RightHeader = () => {

    const { auth } = useAuth();

    return(
        <>
            <div className="right-header">
                <Link to="/">
                    <Icon name="home" />
                </Link>
                <Icon name="plus" />
                <Link to={`/${auth.username}`}>
                    <Image src={Avatar} avatar/>
                </Link>
            </div>
        </>
    );
}