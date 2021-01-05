/**
*   Componente SitioWeb 
**/

import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from './../../../gql/user';
import * as Yup from 'yup';

import './ChangeSitioWeb.scss';
import { toast } from 'react-toastify';

export const ChangeSitioWeb = ({ currentSitioWeb, setShowModal, refetch }) => {

    //Mutation
    const [ updateUser ] = useMutation(UPDATE_USER)

    //Formik
    const formik = useFormik({
        initialValues: {
            sitioWeb : currentSitioWeb
        },
        validationSchema: Yup.object({
            sitioWeb: Yup.string().required()
        }),
        onSubmit : async (formValues) => {
            try {
                const result = await updateUser({
                    variables: {
                        input : {
                            sitioWeb: formValues.sitioWeb
                        }
                    }
                });

                console.log(result);
                const { data } = result;

                if ( !data.updateUser ) {
                    toast.error('No se pudo actualizar sitioWeb');
                } else {
                    toast.success('Sitio Web actualizado');
                    refetch();
                    setShowModal(false) ;
                }

            } catch (error) {
                console.log(error)
                toast.error('Ocurrio algun error');
            }
        }
    });

    return (
        <Form className="change-web" onSubmit={formik.handleSubmit}>
            <Form.Input 
                name="sitioWeb"
                value={formik.values.sitioWeb}
                error={formik.errors.sitioWeb && true}
                onChange={formik.handleChange}
            />
            <Button type="submit" className="btn-submit">
                Cambiar SitioWeb
            </Button>
        </Form> 
    );
}
