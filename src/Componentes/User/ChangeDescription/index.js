/**
*   Componente Descripcion 
**/

import React from 'react'
import { Button, Form, TextArea } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from './../../../gql/user';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import './ChangeDescription.scss'

export const ChangeDescription = ({ currentDescription, setShowModal, refetch }) => {
    
    const [ updateUser ] = useMutation(UPDATE_USER);
    
    //Formki
    const formik = useFormik({
        initialValues: initialValues(currentDescription),
        validationSchema: Yup.object({
            description: Yup.string().required()
        }),
        onSubmit: async (formvalues) => {
            try {
                const result = await updateUser({
                    variables: {
                        input: {
                            description : formvalues.description
                        }
                    }
                });
                
                const { data } = result

                if (!data.updateUser) {
                    toast.error('Error inesperado');
                } else {
                    toast.success('Descriptión actualizado');
                    refetch();
                    setShowModal(false);
                }
                
            } catch (error) {
              toast.error('No se pudo actualziar la descriptión');  
            }
        }
    });
    
    return (
        <Form className="change-description" onSubmit={formik.handleSubmit}>
            <TextArea
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className={formik.errors.description && 'error'}
            />
            <Button type="submit" className="btn-submit">
                Actualizar descripción
            </Button>
        </Form>
    )
}

const initialValues = (currentDescription) => {
    return {
        description: currentDescription || ''
    }
}
