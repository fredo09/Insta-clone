/**
*   Componente Contenido de la publicacion  
**/

import React from 'react'
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { Actions } from './../../Actions';
import { ModalComentarios } from './../../ModalComentarios';
import ImageNotFound from './../../../assets/png/avatar.png'

import './PublicationsFeed.scss';

export const PublicationContent = ({ publication }) => {

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
            <Link to={`/viewPost/${publication.id}`}>
                <div
                className="feed-publication__photo"
                style={{ backgroundImage: `url("${publication.file}")` }}
            />
            </Link>
            <div className="feed-publication__actions">
                <Actions publication={ publication }/>
            </div>
            <div className="feed-publication__comment">
                <ModalComentarios publication={ publication }/>
            </div>
        </div>
    )
}
