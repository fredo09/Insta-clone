/**
*   Creando conexion de apollo client con el backend 
**/

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/'
});

export const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: httpLink  
});