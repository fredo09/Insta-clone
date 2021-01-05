/**
*   Componente Formulario Change Password 
**/

import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import './PasswordForm.scss';

export const FormPassword = () => {

    //Configurando Formik
    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema: Yup.object({
            password : Yup.string().required('La contraseña es Obligatoria').oneOf([ Yup.ref('repitPassword')], 'Las contraseñas deden de coincidir'),
            repitPassword: Yup.string().required('La contraseña es obligatoria').oneOf([ Yup.ref('password')], 'Las contraseñas deden de coincidir')
        }),
        onSubmit: (formValues) => {
            console.log(formValues);
        }
    });

    return (
        <div>
            <h2>Cambia tu contraseña</h2>
            <Form className="password-form" onSubmit={formik.handleSubmit}>
                <Form.Input
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password}/>
                <Form.Input
                    type="passwprd"
                    placeholder="Repetir contraseña"
                    name="repitPassword"
                    value={formik.values.repitPassword}
                    onChange={formik.handleChange}
                    error={formik.errors.repitPassword}/>
                <Button type='submit' className="btn-submit">
                    Cambiar contraseña
                </Button>
            </Form>
        </div>
    );
}

// Inicial valores 
const initialValues = () => {
    return {
        password : '',
        repitPassword: ''
    }
}