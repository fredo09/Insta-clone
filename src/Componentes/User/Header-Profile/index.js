/**
*   Compnente Header Profile 
**/
import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { IS_FOLLOW, FOLLOW, UN_FOLLOW } from './../../../gql/follow';
import { useQuery, useMutation } from '@apollo/client';

import './Header-profile.scss';

export const HeaderProfile = ({ username, auth, handleModal }) => {

    // Query
    const { data, loading, refetch } = useQuery(IS_FOLLOW, {
        variables: { username }
    });

    //Mutation
    const [follow] = useMutation(FOLLOW);
    const [unfollow] = useMutation(UN_FOLLOW);

    //Mostrando boton dependiendo si le sigue o no
    const buttonFollow = () => {
        if (data.isFollow) {
            return (
                <Button icon className="btn-danger" onClick={onUnFollow}>
                    Dejar de Seguir
                </Button> 
            );
        } else {
            return (
                <Button className="btn-action" onClick={onFollow}>
                   Seguir
                </Button> 
            );
        }
    }

    //Para seguir usuario
    const onFollow = async () => {
        try {
            await follow({
                variables: {
                    username
                }
            });
            refetch();
        } catch (error) {
            console.error(error);
        }
    }

    //Para dejar de seguir Usuarios
    const onUnFollow = async () => {
        try {
            await unfollow({
                variables : {
                    username
                }
            });
            refetch();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="header-profile">
            <h2>{username}</h2>
            {username === auth.username ? (
                <div>
                    <Button>
                        Editar perfil
                    </Button>
                    <Icon name="cog" className="icon-config" onClick={() => { handleModal('Settings') }}/>
                </div>
            ) : (
                !loading && buttonFollow()
            )}
        </div>
    ); 
}
