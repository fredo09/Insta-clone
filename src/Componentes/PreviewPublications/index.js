import React from 'react';
import { Image } from 'semantic-ui-react';
import './PreviewPublications.scss';

export const PreviewPublications = ({ publication }) => {
    return (
        <>
            <div className="preview-publications " >
                <Image className="preview-publications__image" src={publication.file}/>
            </div>
        </>
    );
}
