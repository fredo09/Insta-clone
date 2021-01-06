/**
*   Componente Search 
**/

import React, {useState, useEffect} from 'react'
import { Search as SearchUI, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { size } from 'lodash';
import { SEARCH } from './../../gql/user';
import ImageNotFound from './../../assets/png/avatar.png';

import './Search.scss';

export const Search = () => {

    //Satate
    const [ search, setSearch ] = useState(null);
    const [ result, setResult ] = useState([]);

    //Query
    const { data, loading } = useQuery(SEARCH, {
        variables :{
            search
        }
    });

    // Procesando la información
    useEffect(() => {
        if (size(data?.search) > 0) {
            const users = [];

            // agergamos la data al array
            data.search.forEach((user, idx) => {
                users.push({
                    key: idx,
                    title: user.name,
                    username: user.username,
                    avatar:user.avatar
                })
            });

            setResult(users);
        } else {
            setResult([])
        }
    }, [data]);


    // validadndo informacion del input
    const onChange = (e) => {
         if ( e.target.value ) setSearch(e.target.value)
         else setSearch(null)
    }

    const cleanReasult = () => {
        setSearch(null);
        setResult([]);
    }

    return (
        <SearchUI 
            className="search"
            fluid
            loading={loading}
            input={{ icon : "search", iconPosition: "left"}}
            onSearchChange={onChange}
            value={search || ''}
            results={result}
            onResultSelect={cleanReasult}
            resultRenderer={(e) => <ResultSearch data={e}/> }
        />
    )
}

//Mostrando el resultado de la busqueda
const ResultSearch = ({ data }) => {
    console.log(data);
    return (
        <Link className="search__item" to={`/${data.username}`}>
            <Image src={data.avatar || ImageNotFound} />
            <div>
                <p>{data.title}</p>
                <p>{data.username}</p>
            </div>
        </Link>
    );
}
