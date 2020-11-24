/**
*   Creando conexion de apollo client con el backend 
**/

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';

import { getToken } from './../../utils/token';

const httpLink = createUploadLink({
    uri: 'http://localhost:4000/'
});

//Configuracion para enviar token para autorizar peticiones
const authLink = setContext((_, { headers }) => {
    const token = getToken();

    // retornamos el token
    return { 
        headers : {
            ...headers,
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
});

export const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link:  authLink.concat(httpLink)  
});