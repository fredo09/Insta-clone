/**
*   Componente Profile 
**/

import React, { useState } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../../gql/user';
import { UserNotFound } from '../../UserNotFound';
import { ModalBasic } from '../../Modal';
import { AvatarForm } from '../AvatarForm';
import { HeaderProfile } from './../Header-Profile';
import { SettingProfile } from './../SettingsProfile';
import { Followers } from './../../Followers';
import useAuth from '../../../hooks/useContext';
import ImageNotFound from './../../../assets/png/avatar.png';

import './Profile.scss';

export const Profile = ({ username, totalPublications }) => {
    console.log('aqui ', totalPublications);
    //state Modal
    const [ showModal, setShowModal ] = useState(false);
    const [ title, setTitle ] = useState('');
    const [ childrenModal, setChildrenModal ] = useState(null);

    const { auth } = useAuth();
    

    //Graphql getUser
    const { data, loading, error, refetch } = useQuery(GET_USER, {
        variables: { username }
    });

    //evitamos el recargado del componente
    if (loading) return null;
    if (error) return <UserNotFound />

    //Obteniendo data del servidor
    const { getUser } = data;

    // Modal dependiendo del formulario
    const handleModal = (type) => {
        switch (type) {
            case 'avatar':

                setTitle('Subir foto de perfil');
                setChildrenModal(
                    <AvatarForm setShowModal={setShowModal}  auth={auth}/>
                );
                setShowModal(true);
    
                break;
            case 'Settings':
                setTitle('Editar perfil');
                setChildrenModal(
                    <SettingProfile 
                        setShowModal={setShowModal}
                        setChildrenModal={setChildrenModal}
                        setTitle={setTitle}
                        userInfo={getUser}
                        refetch={refetch}
                    />
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
                        src={getUser.avatar ? getUser.avatar : ImageNotFound} 
                        avatar 
                        onClick={ () => username === auth.username && handleModal('avatar') } 
                        />
                </Grid.Column>
                <Grid.Column width={11} className="profile__right">
                    <HeaderProfile  username={getUser.username} auth={auth} handleModal={handleModal}/>
                    <Followers username={username} totalpublications={totalPublications}/>
                    <div className="others">
                        <p className="name">{getUser.name}</p>
                        {getUser.sitioWeb && (
                            <a href={getUser.sitioWeb} target="_blank" className="siteWeb">
                                {getUser.sitioWeb}
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
