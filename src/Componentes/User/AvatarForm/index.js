/**
*   Componente AvatarForm 
**/

import React from 'react';
import { Button } from 'semantic-ui-react';

import './AvatarForm.scss';

export const AvatarForm = ({ setShowModal }) => {

    return(
        <div className="avatar-form">
            <Button>
                <span className="avatar-form__blue">Subir foto</span>
            </Button>
            <Button>
                <span className="avatar-form__red">Eliminiar foto actual</span>
            </Button>
            <Button onClick={() => setShowModal(false)}>
                Cancelar
            </Button>
        </div>
    );
}
