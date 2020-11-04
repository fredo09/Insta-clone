/**
*   Crear context para manejar el estado global de la app 
**/

import { createContext } from 'react';

export const AuthContext = createContext({
    user: undefined
});