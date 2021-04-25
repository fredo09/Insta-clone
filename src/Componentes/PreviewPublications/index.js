import React, { useState } from 'react';
import { Image } from 'semantic-ui-react';
import { ModalPublications } from './../ModalPublication';

import './PreviewPublications.scss';

export const PreviewPublications = ({ publication }) => {


    //state para ver cuando se abre el modal
    const [showModal, setshowModal] = useState(false);

    return (
        <>
            <div className="preview-publications " onClick={ () => setshowModal(true)}>
                <Image className="preview-publications__image" src={publication.file}/>
            </div>
            <ModalPublications show={showModal} setShow={setshowModal} publication={ publication }/>
        </>
    );
}
