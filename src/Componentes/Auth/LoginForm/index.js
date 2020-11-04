/**
*   Componente Login 
**/

import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik }  from 'formik';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from './../../../gql/user';
import { setToken, decodeToken } from './../../../utils/token';
import useContextAuth from './../../../hooks/useContext';
import * as Yup from 'yup';

import './LoginForm.scss';

export const LoginForm = (props) => {

    const [ error, setError ] = useState('');

    //Mutation Login 
    const [ login ] = useMutation(LOGIN_USER);

    //Obteniendo el contexto de la app para ver si hay usuario logeado
    const { setUser } = useContextAuth();
    
    //configuracion formik para validar formulario
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            email: Yup.string().email('Email con formato incorrecto').required('Email es requerido'),
            password: Yup.string().required('password es necesario')
        }),
        onSubmit: async (formValues) => {
            
            // Limpiando es state de error
            setError('');
            
            const newLogin = formValues;

            try {
                const { data } = await login({
                    variables: {
                        input: newLogin
                    }
                });

                const { token } = data.login;

                //Guardamos el token en el localstorage
                setToken(token);

                //Pasando el token decodificado
                setUser(decodeToken(token));
            } catch (error) {
                setError(error.message);
            }
        }
    });

    return(
        <Form className="login-form" onSubmit={formik.handleSubmit}>
            
            <h2>
                Entra al mejor sitio para compartir fotos y videos.
            </h2>
            
            <Form.Input
                type="text"
                placeholder="Correo Electronico"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
            />
            <Form.Input
                type="password"
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
            />
            <Button type="submit" className="btn-submit">
                Iniciar Session
            </Button>
            {
                error && <p className="message-error">{error}</p>
            }        
        </Form>
    );
}

//Inicial valores iniciales para toast
const initialValues = () => {
    return {
        email: '',
        password: ''
    }
}
