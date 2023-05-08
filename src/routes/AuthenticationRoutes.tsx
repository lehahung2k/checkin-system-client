import { lazy } from 'react';

// project imports
import Loadable from '../components/Loadable';

// login option 3 routing
const LoginPage = Loadable(lazy(() => import('../view/authentication/login/Login')));
// const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    // element: <MinimalLayout />,
    children: [
        {
            path: '/auth/login',
            element: <LoginPage/>
        }
        // },
        // {
        //     path: '/pages/register/register3',
        //     element: <AuthRegister3 />
        // }
    ]
};

export default AuthenticationRoutes;
