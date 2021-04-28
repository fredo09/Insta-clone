/**
*    Componente Feed Publications
**/

import React, { useState, useEffect } from 'react'
import { Loader } from 'semantic-ui-react';
import { map } from 'lodash';
import { useQuery } from '@apollo/client';
import { GET_FEED_PUBLICATION } from './../../../gql/publication';
import { PublicationContent } from './../PublicationsFeed';

import './Feed.scss';

export const FeedPublications = () => {

    //Ejecutamos peticion para obtener las publicaciones de los usuario que seguimos
    const { data, loading } = useQuery(GET_FEED_PUBLICATION);

    const spinner = () => {
        return (
            <Loader active inline='centered'/>
        );
    }

    if (loading) return spinner();

    const { getPublicationsFeed } = data;

    return (
        <div className="feed">
            {
                map(getPublicationsFeed, (publication, index) => {
                    return (
                        <PublicationContent key={ index } publication={ publication }/>
                    );    
                })
            }
        </div>
    )
}
