/**
*   Componente AvatarForm 
**/

import React, { useCallback } from 'react';
import { Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { UPLOAD_AVATAR } from './../../../gql/user';

import './AvatarForm.scss';

export const AvatarForm = ({ setShowModal }) => {

    //Mutation para subir files avatar
    const [uploadAvatar] = useMutation(UPLOAD_AVATAR);

    //Funcion para ejecutar el subir fotos
    const onDrop = useCallback( async (acceptedFile) => {

        const file = acceptedFile[0];

        try {
            const result = await uploadAvatar({ variables: { file } });
            console.log(result);
        } catch (error) {
            console.log(error)
        }

    }, []);

    //Configuracion de useDropzone
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/png, image/jpeg', 
        noKeyboard: true,
        multiple: false,
        onDrop
    });

    return(
        <div className="avatar-form">
            <Button {...getRootProps()}>
                <span className="avatar-form__blue">Subir foto</span>
            </Button>
            <Button>
                <span className="avatar-form__red">Eliminiar foto actual</span>
            </Button>
            <Button onClick={() => setShowModal(false)}>
                Cancelar
            </Button>
            <input {...getInputProps()}/>
        </div>
    );
}
