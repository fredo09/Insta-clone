/**
*   Page Auth 
**/
import React, { useState } from 'react';
import { Container, Image } from 'semantic-ui-react';
import { RegisterForm } from './../../Componentes/Auth/RegisterForm';
import { LoginForm } from './../../Componentes/Auth/LoginForm';

import Logo from './../../assets/png/instaclone.png';
import './Auth.scss';

export const Auth = () => {

    const [showLogin, setShowLogin] = useState(true);

    return (
        <Container fluid className="auth">
            <Image src={Logo} />
            <div className="container-form" >
                {
                    showLogin ? (
                        <LoginForm/>
                    ) : (
                        <RegisterForm setShowLogin={setShowLogin}/>
                    )
                }
            </div>

            <div className="change-form">
                <p>
                    {
                        showLogin ? (
                            <>
                                ¿No tienes cuenta?
                                <span onClick={() => setShowLogin(!showLogin)}>Registrate aqui</span>
                            </>
                        ) : (
                            <>
                                ¿Tienes una cuenta?
                                <span onClick={() => setShowLogin(!showLogin)}>Inicia Session</span>
                            </>
                        )
                    }
                </p>
            </div>
        </Container>
    );
}