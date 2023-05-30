import React, { lazy } from 'react';

// project imports
import Loadable from '../components/Loadable';
import MinimalLayout from "../layout/MinimalLayout";

// login option 3 routing
const LoginPage = Loadable(lazy(() => import('../view/authentication/login/Login')));
const RegisterPage = Loadable(lazy(() => import('../view/authentication/register/Register')));
// const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/auth/login',
            element: <LoginPage/>
        },
        {
            path: '/auth/register',
            element : <RegisterPage />
        }
        // {
        //     path: '/pages/register/register3',
        //     element: <AuthRegister3 />
        // }
    ]
};

export default AuthenticationRoutes;
