// Pages
import { Home } from '../../pages/Home';
import { Error404 } from '../../pages/Error404';
import { User } from '../../pages/User';

//Rutas de usuario logeado
export const Routers = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/user',
        component: User,
        exact: true 
    },
    {
        component: Error404
    }
];
