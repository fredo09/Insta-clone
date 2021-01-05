/**
*   Componente ChangePassowrd 
**/

import React from 'react';
import { Container, Image } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { GET_USER } from './../../../gql/user';
import { FormPassword } from './../PasswordForm';
import useAuth from './../../../hooks/useContext';

import ImageNotFound from './../../../assets/png/avatar.png';
import './ChangePassowrdForm.scss';

export const ChangePassowrdForm = () => {

    const { auth } = useAuth();

     //Graphql getUser
    const { data, loading, error } = useQuery(GET_USER, {
        variables: { username : auth.username }
    });

    console.log(data);
    const { getUser } = data;

    //evitamos el recargado del componente
    if (loading) return null;
    if (error) return <h1>Error al cargar informacion del usuario</h1>

    return(
        <Container fluid className="changes-form">
            <div className="container-form">
                <div>
                    <Image src={ getUser.avatar ? getUser.avatar : ImageNotFound } avatar />
                    <h2>{auth.username}</h2>
                    
                    <FormPassword/>
                </div>
            </div>
            
        </Container>
    );
}
