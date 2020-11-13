// Pages
import { Home } from '../../pages/Home';
import { Error404 } from '../../pages/Error404';
import { User } from '../../pages/User';

//Layouts
import { LayoutBasico } from './../../layout';

//Rutas de usuario logeado
export const Routers = [
    {
        path: '/',
        component: Home,
        layout: LayoutBasico,
        exact: true
    },
    {
        path: '/:username',
        component: User,
        layout: LayoutBasico,
        exact: true 
    },
    {
        layout: LayoutBasico,
        component: Error404
    }
];
