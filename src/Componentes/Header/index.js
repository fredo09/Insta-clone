/**
*   Componente Header 
**/

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Image } from 'semantic-ui-react';
import { RightHeader } from './../RightHeader';
import Logo from './../../assets/png/instaclone.png'

import './Header.scss';

export const Header = () => {
    return(
        <div className="header">
            <Container>
                <Grid>
                    <Grid.Column width={3} className="header__logo">
                        <Link to="/">
                            <Image src={Logo} alt="Insta-Clone" />
                        </Link>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        Buscador
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <RightHeader />
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    );
}
