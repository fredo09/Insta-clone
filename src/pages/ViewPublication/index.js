/**
*   Page View Publication
**/

import React from 'react';
import { IsFollow } from './../../Componentes/Follow';
import { Comment } from './../../Componentes/Comment';
import { Actions } from './../../Componentes/Actions';
import { ModalComentarios } from './../../Componentes/ModalComentarios';
import { Image, Grid } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ONLY_PUBLICATION } from './../../gql/publication';

import ImageNotFound from './../../assets/png/avatar.png';

import './ViewPublication.scss';

export const ViewPublication = () => {

    const { username } = useParams();

    const { data, loading, error } = useQuery(GET_ONLY_PUBLICATION, {
        variables: {
            idPublication: username
        }
    });

    if (loading) return 'cangando...';
    if (error) return 'Ocurrio un error';
    const { getPublication } = data;

    return (
        <div className="viewPublication">
            <Grid >
                <Grid.Column
                    className="viewPublication__photo"
                    width={8}
                    style={{ backgroundImage: `url("${getPublication.file}")` }}
                />
                <Grid.Column
                    className="viewPublication__content"
                    width={7}>
                    <div className="viewPublication__header">
                        <Image src={getPublication.idUser.avatar ? getPublication.idUser.avatar : ImageNotFound} avatar />
                        <span> {getPublication.idUser.username} </span>
                        <IsFollow user={ getPublication.idUser}/>
                    </div>
                    <Comment publication={getPublication} />
                    <div className="viewPublication__divider" />
                    <Actions publication={getPublication} />
                    <ModalComentarios publication={getPublication} />
                </Grid.Column>
            </Grid>
        </div>
    );
}
