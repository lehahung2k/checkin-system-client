import { lazy, ReactElement } from 'react';
import { Route, Navigate } from 'react-router-dom';

// project imports
import MainLayout from '../layout/MainLayout/MainLayout';
import Loadable from '../components/Loadable';

// common routing
const UpdateProfile = Loadable(lazy(() => import('../view/common/profile/UpdateProfile')));
const ViewProfile = Loadable(lazy(() => import('../view/common/profile/ViewProfile')));
const DashboardDefault = Loadable(lazy(() => import('../view/dashboard/Dashboard')));

// admin and tenant routing
const EventLists = Loadable(lazy(() => import('../view/admin/event-lists/EventLists')));
const CreateEvent = Loadable(lazy(() => import('../view/admin/create-event/CreateEvent')));

// poc routing
const CheckinPage = Loadable(lazy(() => import('../view/poc/Checkin')));
const ViewGuests = Loadable(lazy(() => import('../view/poc/ViewGuests')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// // sample page routing
// const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout/>,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: '',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'user',
            children: [
                {
                    path: 'account/profile',
                    element: <ViewProfile />
                },
                {
                    path: 'account/settings',
                    element: <UpdateProfile />
                }
            ]
        },
        {
            path: 'poc',
            children: [
                {
                    path: 'checkin',
                    element: <CheckinPage />
                },
                {
                    path: 'view-guests',
                    element: <ViewGuests />
                }
            ]
        },
        {
            path: 'event',
            children: [
                {
                    path: 'lists',
                    element: <EventLists />
                },
                {
                    path: 'create',
                    element: <CreateEvent />
                }
            ]
        },
        // {
        //     path: 'icons',
        //     children: [
        //         {
        //             path: 'tabler-icons',
        //             element: <UtilsTablerIcons />
        //         }
        //     ]
        // },
        // {
        //     path: 'icons',
        //     children: [
        //         {
        //             path: 'material-icons',
        //             element: <UtilsMaterialIcons />
        //         }
        //     ]
        // },
        // {
        //     path: 'sample-page',
        //     element: <SamplePage />
        // }
    ]
};

export default MainRoutes;
