import React from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { ADD_COMMENTS } from './../../gql/comment';
import * as Yup from 'yup';
    
import './ModalComentarios.scss';

export const ModalComentarios = ({ publication }) => {

    // const [isButtonHabilitado, setIsButtonHabilitado] = useState(false);
    const [ addComment ] = useMutation(ADD_COMMENTS);

    const formik = useFormik({
        initialValues: {
            comment: ''
        },
        validationSchema: Yup.object({
            comment: Yup.string().required().max(50, 'Debe de tener menos de 50')
        }),
        onSubmit: async ( valuesForm ) => { 
            try {
                await addComment({
                    variables: {
                        input: {
                            idPublication: publication.id,
                            comment: valuesForm.comment
                        }
                    }
                });
                formik.handleReset(); // reiniciando formualario
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <Form className="form_comentarios" onSubmit={ formik.handleSubmit }>
            {/*<div className="form_comentarios__emoji">
                <Icon name="smile outline">
                </Icon>
            </div>*/}
            <Form.Input placeholder="Agrega un Comentario..." name="comment" value={formik.values.comment} onChange={formik.handleChange} error={ formik.errors.comment && true}/>
            <Button type="submit"> Publicar </Button>
        </Form>
    )
}
