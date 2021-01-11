/**
*   Componente ListFollows 
**/
import React from 'react'
import { size, map } from 'lodash';
import { Image } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import ImageNotFound from './../../../assets/png/avatar.png';
import './ListFollows.scss';

export const ListUsers = ({ users, setShowModal }) => {

    const history = useHistory();

    //Nos movemos al perfil del usuario
    const onGoToUser = (username) => {
        setShowModal(false);
        history.push(`/${username}`);
    }

    return (
        <div className="list-follows">
            {size(users) === 0 ? (
                <p className="list-follows__not-users">No tienes seguidores</p>
            ):(
                map(users, (user, idx) => {
                    return(
                        <div key={idx} className="list-follows__user"onClick={() => onGoToUser(user.username)}>
                            <Image src={user.avatar || ImageNotFound} avatar/>
                            <div>
                                <p>{user.name}</p>
                                <p>{user.username}</p>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}
