/**
*   Componente actions 
**/

import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/client';
import { obtenerFecha } from './../../utils/Libs/Time';
import { ADD_LIKE, DELETE_LIKE, IS_LIKE, COUNT_LIKES } from './../../gql/like';

import './Actions.scss';

export const Actions = ({ publication }) => {

    const { date, mes } = obtenerFecha(publication.createAt);

    const [ loadingAction, serLoadingAction ] = useState(false);

    const [addLike] = useMutation(ADD_LIKE);
    const [deleteLike] = useMutation(DELETE_LIKE);

    
    const { data, loading, refetch } = useQuery(IS_LIKE, {
        variables: {
            idPublication: publication.id
        }
    });

    const { data:dataCount, loading:loadingCount, refetch: reftchCount } = useQuery(COUNT_LIKES, {
        variables: {
            idPublication: publication.id
        }
    });
    
    //Se dio like 
    const onAddLike = async () => {
        serLoadingAction(true);
        try {
            await addLike({
                variables: {
                    idPublication: publication.id
                }
            });
            refetch(); // realizamos un nuevo refetch 
            reftchCount();
        } catch (error) {
            console.log(error);
        }
        serLoadingAction(false);
    }

    //Se elimino like
    const onDeleteLike = async () => {
        serLoadingAction(true)
        try {
            await deleteLike({
                variables: {
                    idPublication: publication.id
                }
            });
            refetch();
            reftchCount();
        } catch (error) {
            console.log(error);
        }
        serLoadingAction(false);
    }

    const actionLike = () => {
        if (!loadingAction) {
            if (isLike) {
                onDeleteLike();
            } else {
                onAddLike();
            }
        }
    }

    if ( loading || loadingCount ) return null;

    const { isLike } = data;
    const { countLikes } = dataCount;
    return (
        <>
            <div className="actions">
                <Icon
                    className={ isLike ? "like active" : "like" }
                    name={ isLike ? "heart": "heart outline" }
                    onClick={ actionLike } 
                />
            </div>
            <div className="text-info">
                <p>{ countLikes } Me Gusta </p>
                <span>{ `${date} de ${mes}` }</span>
            </div>
        </>
    )
}
