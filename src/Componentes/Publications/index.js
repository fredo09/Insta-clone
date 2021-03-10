import React from 'react';
import { PreviewPublications } from './../../Componentes/PreviewPublications';
import { Grid } from 'semantic-ui-react';
import { map } from 'lodash';
import './Publications.scss';

export const Publications = ({ getPublications }) => {
    return (
        <div className="publications">
            <h2>
                Publicaciones
            </h2>
            <Grid columns={4}>
                {map(getPublications, (publication, index) => (
                    <Grid.Column key={index}> 
                        <PreviewPublications publication={publication}/>
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    );
}
