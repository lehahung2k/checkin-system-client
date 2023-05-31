import { lazy, ReactElement } from 'react';

// project imports
import MainLayout from '../layout/MainLayout/MainLayout';
import Loadable from '../components/Loadable';

// common routing
const UpdateProfile = Loadable(lazy(() => import('../view/common/profile/UpdateProfile')));
const ViewProfile = Loadable(lazy(() => import('../view/common/profile/ViewProfile')));
const DashboardDefault = Loadable(lazy(() => import('../view/dashboard/Dashboard')));
const AboutUs = Loadable(lazy(() => import('../view/common/about-us/AboutUs')));
const Helps = Loadable(lazy(() => import('../view/common/help/Helps')))

// admin and tenant routing
const EventLists = Loadable(lazy(() => import('../view/admin/event-lists/EventLists')));
const CreateEvent = Loadable(lazy(() => import('../view/admin/create-event/CreateEvent')));

// admin routing
const TenantLists = Loadable(lazy(() => import('../view/admin/tenants/TenantLists')));
const PocLists = Loadable(lazy(() => import('../view/admin/poc/PocLists')));

// poc routing
const CheckinPage = Loadable(lazy(() => import('../view/poc/Checkin')));
const ViewGuests = Loadable(lazy(() => import('../view/poc/ViewGuests')));

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
            path: 'admin',
            children: [
                {
                    path: 'tenant-lists',
                    element: <TenantLists />
                },
                {
                    path: 'create-tenant',
                },
                {
                    path: 'poc-lists',
                    element: <PocLists/>
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
            path: 'tenant',
            children: [
                {
                    path: 'view-tenants',
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
        {
            path: 'other',
            children: [
                {
                    path: 'about-us',
                    element: <AboutUs />
                },
                {
                    path: 'helps',
                    element: <Helps/>
                }
            ]
        },
        // {
        //     path: 'sample-page',
        //     element: <SamplePage />
        // }
    ]
};

export default MainRoutes;
