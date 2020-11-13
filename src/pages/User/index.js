/**
*   Page User 
**/

import React from 'react';
import { useParams } from 'react-router-dom';

export const User = () => {

    const params = useParams();

    console.log(params);

    return(
        <div>
            <h1>User</h1>
        </div>
    );
}
