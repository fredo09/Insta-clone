/**
*   Componente AvatarForm 
**/

import React, { useCallback, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { UPLOAD_AVATAR, GET_USER, DELETE_AVATAR } from './../../../gql/user';
import { toast } from 'react-toastify';

import './AvatarForm.scss';

export const AvatarForm = ({ setShowModal, auth }) => {

    //Mutation para subir files avatar
    const [uploadAvatar] = useMutation(UPLOAD_AVATAR, {
        update(cache, { data: { uploadAvatar } }) {
            // Obteniendo informacion del usuario de la cache de apollo
            const { getUser } = cache.readQuery({
                query: GET_USER,
                variables: {
                    username: auth.username
                }
            });

            //Actualizando cache con la nueva información
            cache.writeQuery({
                query: GET_USER,
                variables: {
                    username: auth.username
                },
                data: {
                    getUser: { ...getUser, avatar: uploadAvatar.urlAvatar }
                } 
            });
        }
    });

    //Eliminando Avatar del usuario
    const [ deleteAvatar ] = useMutation(DELETE_AVATAR, {
        update( cache ){
            //Obteniendo info del usuario de la cache de apollo 
            const { getUser } = cache.readQuery({
                query: GET_USER,
                variables: {
                    username: auth.username
                }
            });

            //Actualizamos la cache con la nueva informacion
            cache.writeQuery({
                query: GET_USER,
                variables: {
                    username: auth.username
                },
                data: {
                    getUser: { ...getUser, avatar: '' }
                }
            })
        }
    });
    
    //State
    const [loading, setLoading] = useState(false);

    //Funcion para ejecutar el subir fotos
    const onDrop = useCallback( async (acceptedFile) => {

        const file = acceptedFile[0];

        try {
            setLoading(true);

            const result = await uploadAvatar({ variables: { file } });

            const { status } = result.data.uploadAvatar;

            if ( !status ) {
                toast.error('Ocurrio un error al actualizar la foto de perfil');
                setLoading(false);
            } else {
                // si todo va bien actualizamos los states
                setLoading(false);
                setShowModal(false);
            }

        } catch (error) {
            console.log(error)
        }

    }, []);

    //Configuracion de useDropzone para abrir explorador de archivos
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/png, image/jpeg', 
        noKeyboard: true,
        multiple: false,
        onDrop
    });

    //Funcion para eliminar Avatar
    const handleDeleteAvatar = async () => {
        try {

            const { data } = await deleteAvatar(); 
            
            if (!data.deleteAvatar) {
                toast.error('Ocurrio algun Problema');
            } else {            
                setShowModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="avatar-form">
            <Button 
                {...getRootProps()}
                loading={loading}
            >
                <span className="avatar-form__blue">Subir foto</span>
            </Button>
            <Button>
                <span className="avatar-form__red" onClick={handleDeleteAvatar}>Eliminiar foto actual</span>
            </Button>
            <Button onClick={() => setShowModal(false)}>
                Cancelar
            </Button>
            <input {...getInputProps()}/>
        </div>
    );
}
