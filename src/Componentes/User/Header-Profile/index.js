/**
*   Compnente Header Profile 
**/

import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

import './Header-profile.scss';

export const HeaderProfile = ({ username, auth, handleModal }) => {

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
                <Button>
                    Seguir
                </Button>
            )}
        </div>
    ); 
}