/**
*   Componente App 
**/

import React, { useState, useEffect, useMemo } from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './config/apollo';
import { ToastContainer } from 'react-toastify';
import { getToken, decodeToken } from './utils/token';
import { AuthContext } from './context/AuthContext';

import { Auth } from './pages/Auth';
import { Navegacion } from './routers/Navegacion';

import './App.css';

export const App = () => {
  // State 
  const [ auth, setAuth ] = useState(undefined);

  useEffect(() => {
    //Recuperamos el token del localstorege
    const token = getToken();

    if(!token) {
      setAuth(null);
    } else {
      setAuth(decodeToken(token));
    }

  }, []);

  //deslogeo del usuario 
  const logout = () => {
    console.log('deslogueo del usuario');
  }

  //Seteando el usuario
  const setUser = (user) => {
    // recibe el token 
    setAuth(user);
  }

  // revisa si llega nuevas varibles para renderizar el componente
  const authDate = useMemo(() => ({
    auth,
    logout,
    setUser
  }), [auth]);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authDate}>
        {
          !auth ? <Auth /> :  <Navegacion />
        }
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rlt={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}
