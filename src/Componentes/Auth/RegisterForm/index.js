/**
*   Componente Register 
**/

import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import { useFormik }  from 'formik';
import { REGISTER_USER } from './../../../gql/user';
import  * as Yup from 'yup';

import './RegisterForm.scss';

export const RegisterForm = ({ setShowLogin }) => {

    // useMutation para graphql
    const [ register ] = useMutation(REGISTER_USER);

    //Formik para estructura de datos para el formulario
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            name: Yup.string().required(true),
            username: Yup.string().matches(/^[a-zA-Z0-9-]*$/, "El nombre del usuario no puede tener espacio").required("El nombre del usuario debe ser llenado"),
            email: Yup.string().email('El email es obligatorio').required('Emailes requerido'),
            password: Yup.string().required('La contraseña es obligatoria').oneOf([ Yup.ref('repetirPassword') ], 'La contraseña no son iguales') ,
            repetirPassword: Yup.string().required('La contraseña es obligatoria').oneOf([ Yup.ref('password') ], 'Las contraseñas no coinciden') ,
        }),
        onSubmit: async (formValue) => {
            try {
                const newUser = formValue;
                delete newUser.repetirPassword;

                // registrando usuario usando el mutation
                const result = await register({
                    variables:{
                        input:newUser
                    }
                });

                console.log(result);
                
                // Mostrando mensaje de confirmación
                toast.success('Usuario registrado')
                
                //seteando el state de login para mostrar formulario de login
                setShowLogin(true);
            } catch(err) {
                toast.error(err.message)
                console.log(err.message);
            }
        }
    });

    return(
        <>
            <h2 className="register-form-title">
                Registrate para ver fotos y videos de tus amigos.
            </h2>

            <Form className="register-form" onSubmit={formik.handleSubmit}>
                <Form.Input
                    type="text"
                    placeholder="Nombre y Apellido"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.errors.name}
                />
                <Form.Input
                    type="text"
                    placeholder="Nombre del Usuario"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.errors.username}
                />
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
                <Form.Input
                    type="password"
                    placeholder="Repetir Password"
                    name="repetirPassword"
                    value={formik.values.repetirPassword}
                    onChange={formik.handleChange}
                    error={formik.errors.repetirPassword}
                />
                <Button 
                    className="btn-submit"
                    type="submit">
                    Registrate
                </Button>
                
                {/** 
                <Button 
                    className="" 
                    type="button" 
                    onClick={formik.handleReset}>
                    Reset
                </Button>*/}
            </Form>
        </>
    );
}

//Initial Values formik
const initialValues = () => {
    return {
        name: "",
        username: "",
        email: "",
        password: "",
        repetirPassword: ""
    }
}