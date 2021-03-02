/**
 *   Componente ModalUPload
 **/
import React, { useState, useCallback } from "react";
import { Modal, Icon, Button, Dimmer, Loader } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { PUBLISH } from "./../../gql/publication";
import { toast } from "react-toastify";

import "./ModalUPload.scss";

export const ModalUPload = ({ show, setShow }) => {
  //State
  const [fileUpload, setFileUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //Mutation
  const [publish] = useMutation(PUBLISH);

  //Funcion para cerrar el modal cuando se de click afuera del mismo
  const onCloseModal = () => {
    setIsLoading(false);
    setFileUpload(null);
    setShow(false);
  };

  //Funcion donde llegara la imagen a subir
  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFileUpload({
      type: "image",
      file,
      preview: URL.createObjectURL(file),
    });
  });

  //Usando hook dropZone
  const { getRootProps, getInputProps } = useDropzone({
    //configuración
    accept: "image/png, image/jpeg",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const onPublish = async () => {
    try {
      setIsLoading(true);
      const result = await publish({
        variables: {
          file: fileUpload.file,
        },
      });

      const { data } = result;
      if (!data.publish.status) {
        toast.error("Ocurrio un error al publicar la foto");
        isLoading(false);
      } else {
        onCloseModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      size="small"
      onClose={onCloseModal}
      open={show}
      className="modal-upload"
    >
      <div
        {...getRootProps()}
        className="dropzone"
        style={fileUpload && { border: 0 }}
      >
        {!fileUpload && (
          <>
            <Icon name="cloud upload" />
            <p>Arrastra tu foto aqui.</p>
          </>
        )}
        <input {...getInputProps()} />
      </div>

      {fileUpload?.type === "image" && (
        <div
          className="image"
          style={{ backgroundImage: `url(${fileUpload.preview})` }}
        />
      )}

      {fileUpload && (
        <Button className="btn-action btn-upload" onClick={onPublish}>
          Publicar
        </Button>
      )}

      {isLoading && (
        <Dimmer active className="publishing">
          <Loader />
          <p>Publicando...</p>
        </Dimmer>
      )}
    </Modal>
  );
};
