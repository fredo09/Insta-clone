// Pages
import { Home } from '../../pages/Home';
import { Error404 } from '../../pages/Error404';
import { User } from '../../pages/User';
import { ChangePassowrd } from './../../pages/ChangePassword';
import { ViewPublication } from './../../pages/ViewPublication';

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
        path: '/cuenta/password/change',
        component: ChangePassowrd,
        layout: LayoutBasico,
        exact: true
    },
    {
        path: '/viewPost/:username',
        component: ViewPublication,
        layout: LayoutBasico,
        exact: true
    },
    {
        layout: LayoutBasico,
        component: Error404
    }
];
