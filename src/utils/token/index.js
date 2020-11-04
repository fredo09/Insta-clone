/**
*   Funciones para manejar el token para toda la aplicación 
**/

import { TOKEN_USER } from './../contantes';
import jwtDecode from 'jwt-decode';

//Funcion para guardar el token en el localstorage
export const setToken = (token) => {
    localStorage.setItem(TOKEN_USER, token);
}

//Función para recuperar el token
export const getToken = () => {
    return localStorage.getItem(TOKEN_USER);
}

//Funcion para decodificar el token del usuario logeado
export const decodeToken = (token) => {
    return jwtDecode(token);
}