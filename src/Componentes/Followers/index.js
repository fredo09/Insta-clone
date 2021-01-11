/**
*   Componente Followers 
**/

import React, { useEffect, useState } from 'react';
import { size } from 'lodash';
import { useQuery } from '@apollo/client';
import { GET_FOLLOWERS, GET_FOLLOWEDS } from './../../gql/follow';
import { ModalBasic } from './../Modal';
import { ListUsers } from './../User/ListFollows';

import './Followers.scss';

export const Followers = ({ username }) => {

    //state Modal
    const [ showModal, setShowModal ] = useState(false);
    const [ title, setTitle ] = useState('');
    const [ childrenModal, setChildrenModal ] = useState(null);

    /*
    *   Poniendo alias a data y loading para evitar conflicto con otras peticiones
    */
    // Obtenermos los usuarios seguidores de un usuario
    const { data: dataFollowers, loading: loadingFollowers, startPolling: startPollingFollowers, stopPolling: stopPollingFolloers  } = useQuery(GET_FOLLOWERS, {
        variables: {
            username
        }
    });

    //Obtenemos los usuarios que sigue un usuario
    const { data: dataFolloweds, loading: loadingFolloweds, startPolling: startPollingFolloweds, stopPolling: stopPollingFolloweds } = useQuery(GET_FOLLOWEDS, {
        variables: {
            username
        }
    })

    //Usando realTime para actualizar seguidores de un usuario
    useEffect(() => {
        startPollingFollowers(1000);
        return () => {
            stopPollingFolloers();
        }
    }, [stopPollingFolloers, startPollingFollowers]);

        // Usando realTime para mostrar los usuarios seguidos de un usuario
    useEffect(() => {
        startPollingFolloweds(1000);
        return () => {
            stopPollingFolloweds();
        }
    }, [stopPollingFolloweds, stopPollingFolloweds]);

    //retonamos null cuando se este pidiendo información al servidor
    if (loadingFollowers || loadingFolloweds) return null;

    //Manejando el Modal para usuarios seguidores de un usuario
    const onModalFollowers = () => {
        setTitle('Seguidores');
        setChildrenModal(
            <ListUsers users={dataFollowers.getFollowers} setShowModal={setShowModal}/>
        );
        setShowModal(true);
    }

    //Manejando Modal para usuarios seguidos de un usuario 
    const onModalFolloweds = () => {
        setTitle('Seguidos');
        setChildrenModal(
            <ListUsers users={dataFolloweds.getFolloweds} setShowModal={setShowModal}/>
        );
        setShowModal(true);
    }
    
    return (
        <>
            <div className="followers">
                <p>
                    <span></span>
                    publicaciones
                </p>
                <p className="link" onClick={onModalFollowers}>
                    <span>{ size(dataFollowers.getFollowers) }</span>
                    seguidores
                </p>
                <p className="link" onClick={onModalFolloweds}>
                    <span>{size(dataFolloweds.getFolloweds)}</span>
                    seguidos
                </p>
            </div>
            <ModalBasic show={showModal} setShow={setShowModal} title={title}>
                {childrenModal}
            </ModalBasic>
        </>
    );
}
