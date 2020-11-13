/**
*   Layout  
**/

import React from 'react';
import { Container } from 'semantic-ui-react';
import { Header } from './../Componentes/Header';

export const LayoutBasico = ({ children }) => {
    return(
        <>
            <Header/>
            <Container className="layout-basico">
                {children}
            </Container>
        </>
    );
}
