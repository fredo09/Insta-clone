/**
*   Navegación 
**/

import React from 'react';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import { Routers } from '../Router/index';
import { map } from 'lodash';

//Navegacion

export const Navegacion = () => {
    return(
        <Router>
            <Switch>
                {map(Routers, (route, index) => (
                    <Route 
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (
                            <route.layout>
                                <route.component {...props} />
                            </route.layout>
                        )}
                    />
                ))}
            </Switch>
        </Router>
    );
}