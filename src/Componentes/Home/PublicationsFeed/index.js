/**
*   Componente Contenido de la publicacion  
**/

import React from 'react'
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import ImageNotFound from './../../../assets/png/avatar.png'

import './PublicationsFeed.scss';

export const PublicationContent = ({ publication }) => {
    console.log(publication);
    return (
        <div className="feed-publication">
            <div className="feed-publication__user">
                <Link to={`/${publication.idUser.username}`}>
                    <Image src={publication.idUser.avatar || ImageNotFound} avatar />
                    <span>
                        { publication.idUser.username }
                    </span>
                </Link>
            </div>
        </div>
    )
}
