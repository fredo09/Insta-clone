/**
*   Page Home 
**/

import React from 'react';
import { Grid } from 'semantic-ui-react'
import { FeedPublications } from './../../Componentes/Home/Feed';

import './Home.scss';

export const Home = () => {

    return(
        <Grid className="home">
            <Grid.Column
                className="home__left"
                width={11}
            >
                <FeedPublications />
            </Grid.Column>
            <Grid.Column
                className="home__right"
                width={5}
            >
                <h1>Usuarios que no seguimos</h1>
            </Grid.Column>
        </Grid>
    );
}