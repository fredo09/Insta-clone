/**
*   Componente Profile 
**/

import React, { useState } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { GET_USER } from './../../gql/user';
import { UserNotFound } from './../../Componentes/UserNotFound';
import { ModalBasic } from './../Modal';
import { AvatarForm } from './../User/AvatarForm';
import useAuth from './../../hooks/useContext';
import ImageNotFound from './../../assets/png/avatar.png';

import './Profile.scss';

export const Profile = ({ username }) => {

    //state Modal
    const [ showModal, setShowModal ] = useState(false);
    const [title, setTitle] = useState('');
    const [childrenModal, setChildrenModal] = useState(null);

    const { auth } = useAuth();

    //Graphql getUser
    const { data, loading, error } = useQuery(GET_USER, {
        variables: { username }
    });

    //evitamos el recargado del componente
    if (loading) return null;
    if (error) return <UserNotFound />

    const { getUser } = data;

    // Modal dependiendo del formulario
    const handleModal = (type) => {
        switch (type) {
            case 'avatar':

                setTitle('Subir foto de perfil');
                setChildrenModal(
                    <AvatarForm setShowModal={setShowModal} />
                );
                setShowModal(true);
    
                break;
        
            default:
                break;
        }
    }

    return(
        <>
            <Grid className="profile">
                <Grid.Column width={5} className="profile__left">
                    <Image 
                        src={ImageNotFound} 
                        avatar 
                        onClick={ () => username === auth.username && handleModal('avatar') } 
                        />
                </Grid.Column>
                <Grid.Column width={11} className="profile__right">
                    <div>
                        header profile
                    </div>
                    <div>
                        Followers
                    </div>
                    <div className="others">
                        <p className="name">{getUser.name}</p>
                        {getUser.siteWeb && (
                            <a href={getUser.siteWeb} target="_blank" className="siteWeb">
                                {getUser.siteWeb}
                            </a> 
                        )}
                        {getUser.description && (
                            <p className="description"> {getUser.description} </p>
                        )}
                    </div>
                </Grid.Column>
            </Grid>

            <ModalBasic show={showModal} setShow={setShowModal} title={title}>
                {childrenModal}
            </ModalBasic>
        </>
    );
}
