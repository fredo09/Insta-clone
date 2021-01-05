/**
*   Pages ChangePassowrd 
**/

import React from 'react';
import { ChangePassowrdForm } from './../../Componentes/User/ChangePasswordForm';
import useAuth from './../../hooks/useContext';

export const ChangePassowrd = () => {

    const auth = useAuth();

    console.log(auth);

    return(
        <>
            <ChangePassowrdForm />
        </>
    );
}