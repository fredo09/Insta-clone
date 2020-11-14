/**
*   Componente Profile 
**/

import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { GET_USER } from './../../gql/user';
import ImageNotFound from './../../assets/png/avatar.png';

import './Profile.scss';

export const Profile = ({ username }) => {

    const { data, loading, error } = useQuery(GET_USER, {
        variables: { username }
    });

    //evitamos el recargado del componente
    if (loading) return null;
    if (error) return <h1>Error usuario no encontrado</h1>

    const { getUser } = data;

    return(
        <>
            <Grid className="profile">
                <Grid.Column width={5} className="profile__left">
                    <Image src={ImageNotFound} avatar/>
                </Grid.Column>
                <Grid.Column width={11} className="profile__right">
                    <div>
                        header profile
                    </div>
                    <div>
                        Followers
                    </div>
                    <div className="others">
                        <p className="name">{getUser.name}</p>
                        {getUser.siteWeb && (
                            <a href={getUser.siteWeb} target="_blank" className="siteWeb">
                                {getUser.siteWeb}
                            </a> 
                        )}
                        {getUser.description && (
                            <p className="description"> {getUser.description} </p>
                        )}
                    </div>
                </Grid.Column>
            </Grid>
        </>
    );
}
