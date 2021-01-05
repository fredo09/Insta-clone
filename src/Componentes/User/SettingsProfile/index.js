/**
*   Componente Settings Profile 
**/

import React from 'react';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { ChangePassowrd } from './../FormChangePass';
import { ChangeEmail } from './../ChangeEmail';
import { ChangeDescription } from './../ChangeDescription';
import { ChangeSitioWeb } from './../ChangeSitioWeb';
import setAuth from './../../../hooks/useContext';

import './SettingProfile.scss';

export const SettingProfile = ({ setShowModal, setChildrenModal, setTitle, userInfo, refetch }) => {

    const { logout } = setAuth();
    const client = useApolloClient();
    const history = useHistory();

    //Cambiar el componente del Modal
    const onChangeModalPassword = () => {
        setTitle('Cambiar Contraseña');
        setChildrenModal(
            <ChangePassowrd setShowModal={setShowModal}/>
        );
    }

    //Cambiar el componente del modal
    const onChangeModalEmail = () => {
        setTitle('Cambiar Email');
        setChildrenModal(
            <ChangeEmail 
                currentEmail={userInfo.email} 
                setShowModal={setShowModal}
                refetch={refetch} 
            />
        );
    }

    //Cambiar el componente del Modal
    const onChangeModalDescription = () => {
        setTitle('Cambiar Descripción');
        setChildrenModal(
            <ChangeDescription 
                currentDescription={userInfo.description}
                setShowModal={setShowModal}
                refetch={refetch}
            />
        );
    }

    //Cambiar el componente del modal
    const onChangeModalSitioWeb = () => {
        setTitle('Cambiar Sitio Web');
        setChildrenModal(
            <ChangeSitioWeb 
                currentSitioWeb={userInfo.sitioweb}
                setShowModal={setShowModal}
                refetch={refetch}
            />
        );
    }

    const onLogout = () => {
        // Limpiamos la cache de apollo
        client.clearStore();
        
        //Removemos el token y la autenticacion del usuario
        logout();

        //redireccionamos a la ruta raiz
        history.push('/');
    }

    return(
        <div className="setting-form">
            <Button onClick={onChangeModalPassword}>
                {/*<Link to="/cuenta/password/change" className="setting-form__link">
                    Cambiar Contraseña
                </Link>*/}
                Cambiar Contraseña
            </Button>
            <Button onClick={onChangeModalEmail}>
                Cambiar Email
            </Button>
            <Button onClick={onChangeModalDescription}>
                Cambiar Description
            </Button>
             <Button onClick={onChangeModalSitioWeb}>
                Cambiar Sitio Web
            </Button>
            <Button onClick={onLogout}>
                Salir
            </Button>
            <Button onClick={() => {setShowModal( false )}}>
                Cerrar
            </Button>
        </div>
    );
}