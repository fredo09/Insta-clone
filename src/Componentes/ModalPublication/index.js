/**
*   Componente Modal Publications 
**/

import React from 'react';
import { Modal, Grid, Divider, Image } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { GET_USER } from './../../gql/user';
import useAuth from './../../hooks/useContext';
import AvatarImage from './../../assets/png/avatar.png';
import { ModalComentarios } from './../ModalComentarios';
import { Comment } from './../Comment';

import './ModalPublication.scss';

export const ModalPublications = ({ show, setShow, publication }) => {

    const onCloseModal = () => setShow(false);

    //Contexto de la aplicaion este caso para la autenticacion
    const { auth } = useAuth();

    const { data: dataUser, loading: loadingUser, error: errorUser } = useQuery(GET_USER, {
        variables: {
            username: auth.username
        }
    });

    if (loadingUser || errorUser) return null;
    
    const { getUser } = dataUser;

    return (
        <Modal open={show} onClose={onCloseModal} className="modal_publications">
            <Grid>
                <Grid.Column
                    className="modal_publications__left"
                    width={10}
                    style={{ backgroundImage: `url("${publication.file}")` }} />
                
                <Grid.Column className="modal_publications__right" width={6}>
                    <div className="header_publications">
                        <Image src={getUser.avatar ? getUser.avatar : AvatarImage} avatar />
                        <span> { getUser.username } </span>
                    </div>
                    <Divider />
                    <Comment publication={ publication }/>
                    <Divider />
                    <div>Acciones</div>
                    <Divider />
                    <ModalComentarios publication={ publication }/>
                </Grid.Column>
            </Grid>
        </Modal>
    );
}
