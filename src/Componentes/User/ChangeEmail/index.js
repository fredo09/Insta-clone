/**
*   Componente ChangeEmail 
**/

import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from './../../../gql/user';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import './ChangeEmail.scss';

export const ChangeEmail = ({ currentEmail, setShowModal, refetch }) => {
    
    //Mutation
    const [ updateUser ] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: initialValues(currentEmail),
        validationSchema: Yup.object({
            newEmail: Yup.string().email().required()
        }),
        onSubmit: async ( formvalues ) => {
            try {
                const result = await updateUser({
                    variables : {
                        input : {
                            email: formvalues.newEmail
                        }
                    }
                });

                const { data } = result;

                if ( !data.updateUser ) {
                    //Ocurrio algun error
                    toast.error('No se pudo actualizar el Email');
                } else {
                    //Todo paso super bien
                    toast.success('Email actualizado');
                    refetch(); // haccemos un refresh con apollo client
                    setShowModal(false);
                }

            } catch(error) {
                console.log(error);
                toast.error('Error al actualizar contraseña');
            }
        }
    });

    return(
        <Form className="email-form" onSubmit={formik.handleSubmit}>
            <Form.Input 
                placeholder="Escribe el email"
                name="newEmail"
                type="text"
                onChange={formik.handleChange}
                error={formik.errors.newEmail && true}
                value={formik.values.newEmail}
            />
            <Button type="submit" className="btn-submit">
                Cambiar Email
            </Button>
        </Form>
    );
}

//InitialValues
const initialValues = (currentEmail) => {
    return {
        newEmail: currentEmail
    }
}
