/**
*   Componente Modal 
**/

import React from 'react';
import { Modal } from 'semantic-ui-react';
import './Modal.scss';

export const ModalBasic = ({ show, setShow, title, children }) => {

    //funcion para cerrar el modal
    const onClose = () => {
        setShow(false);
    }

    return (
        <Modal size="mini" open={show} onClose={onClose} className="modal-basic">
            {title && <Modal.Header>{title}</Modal.Header>}
            {children}
        </Modal>
    );
}