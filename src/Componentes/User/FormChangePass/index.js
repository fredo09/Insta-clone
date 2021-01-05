/**
*   ChangePassword Componente 
**/

import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from './../../../gql/user';
import {toast} from 'react-toastify';
import * as Yup from 'yup';

import './FormChangePass.scss';

export const ChangePassowrd = ({ setShowModal }) => {

    //Mutation
    const [ updateUser ] = useMutation(UPDATE_USER); 

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            currentPassword: Yup.string().required(),
            newPassword : Yup.string().required('La contraseña es Obligatoria').oneOf([ Yup.ref('repitPassword')]),
            repitPassword: Yup.string().required('La contraseña es obligatoria').oneOf([ Yup.ref('newPassword')])
        }),
        onSubmit: async ( formvalues ) => {
            try {
                const result = await updateUser({
                    variables : {
                        input : {
                            currentPassword: formvalues.currentPassword,
                            newPassword: formvalues.newPassword
                        }
                    }
                });

                const { data } = result;
                //Mostrando mensaje de atualizacion de contraseña
                if ( !data.updateUser ) {
                    toast.error('Error al actualizar contraseña');
                } else {
                    toast.success('Se cambio la contraseña');
                    setShowModal(false);
                } 
            } catch (error) {
                console.error(error);
                toast.error('Error al actualizar contraseña');
            }
           
        }
    });

    return(
        <Form className="form-password" onSubmit={formik.handleSubmit}>
            <Form.Input 
                placeholder="Contraseña Actual" 
                name="currentPassword" 
                type="password"
                value={formik.values.currentPassword}
                error={formik.errors.currentPassword && true}
                onChange={formik.handleChange}
            />
            <Form.Input 
                placeholder="Nueva Contraseña" 
                name="newPassword" 
                type="password"
                value={formik.values.newPassword}
                error={formik.errors.newPassword && true}
                onChange={formik.handleChange} 
            />
             <Form.Input 
                placeholder="Confirmar Contraseña" 
                name="repitPassword" 
                type="password"
                value={formik.values.repitPassowrd}
                error={formik.errors.repitPassowrd && true}
                onChange={formik.handleChange} 
            />

            <Button type="submit" className="btn-submit"> Cambiar Contraseña </Button>
        </Form>
    );
}

//Initial forms
const initialValues = () => {
    return {
        currentPassword: '',
        newPassword: '',
        repitPassword: ''
    }
}
