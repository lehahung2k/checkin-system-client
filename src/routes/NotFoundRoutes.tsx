import React, { lazy } from 'react';
import Loadable from "../components/Loadable";
import MinimalLayout from "../layout/MinimalLayout";

const NotFound = Loadable(lazy(() => import('../view/common/404notfound/NotFound')));

const NotFoundRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '*',
            element: <NotFound />
        }
    ]
}

export default NotFoundRoutes;
