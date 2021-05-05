/**
*   Page Home 
**/

import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FeedPublications } from './../../Componentes/Home/Feed';
import { UsersNotFolloweds } from './../../Componentes/Home/UsersNotFolloweds';
import { useQuery } from '@apollo/client';
import { GET_USER } from './../../gql/user';
import useAuth from './../../hooks/useContext';
import ImageNotFound from './../../assets/png/avatar.png';

import './Home.scss';

export const Home = () => {

    const { auth } = useAuth();

    const { data, loading, error } = useQuery(GET_USER, {
        variables : {
            username: auth.username
        }
    });

    if (loading || error) return null;

    const { getUser } = data;

    return(
        <Grid className="home">
            <Grid.Column
                className="home__left"
                width={11}>
                <FeedPublications />
            </Grid.Column>
            <Grid.Column
                className="home__right"
                width={5}>
                <Link to={`/${getUser.username}`}>
                    <div className="account-home">
                        <Image src={getUser.avatar || ImageNotFound} avatar />
                        <div className="account-home__desc">
                            <span> {getUser.name} </span>
                            <span> { getUser.username } </span>
                        </div>
                    </div>
                </Link>
                <UsersNotFolloweds />
            </Grid.Column>
        </Grid>
    );
}