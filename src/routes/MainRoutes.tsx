import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout/MainLayout';
import Loadable from '../components/Loadable';
import checkRole from "../services/checkRole";

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
const Summary = Loadable(lazy(() => import('../view/admin/sumary/SummaryAll')));

// tenant routing
const TenantView = Loadable(lazy(() => import('../view/tenant/tenant-view/TenantView')));
const ManagePoc = Loadable(lazy(() => import('../view/tenant/mange-poc/ManagePoc')));
const CreateNewTenant = Loadable(lazy(() => import('../view/tenant/create-tenant/CreateNewTenant')));
// const TenantDashboard = Loadable(lazy(() => import('../view/tenant/TenantDashboard')));

// poc routing
const CheckinPage = Loadable(lazy(() => import('../view/poc/Checkin')));
const ViewGuests = Loadable(lazy(() => import('../view/poc/ViewGuests')));

// ==============================|| MAIN ROUTING ||============================== //

// admin routes
const adminRoutes = checkRole.getRole() === 'admin' && [
    {
        path: 'tenant-lists',
        element: <TenantLists />,
    },
    {
        path: 'poc-lists',
        element: <PocLists />,
    },
    {
        path: 'summary',
        element: <Summary />,
    },
];

// tenant routes
const tenantRoutes = checkRole.getRole() === 'tenant' && [
    {
        path: 'view-tenant',
        element: <TenantView />
    },
    {
        path: 'manage-poc',
        element: <ManagePoc />
    }, 
    {
        path: 'create-tenant',
        element: <CreateNewTenant />
    }
]

// poc routes
const pocRoutes = checkRole.getRole() === 'poc' && [
    {
        path: 'checkin',
        element: <CheckinPage />
    },
    {
        path: 'view-guests',
        element: <ViewGuests />
    }
]

// admin and tenant routes
const adminAndTenantRoutes = (checkRole.getRole() === 'admin' || checkRole.getRole() === 'tenant') && [
    {
        path: 'lists',
        element: <EventLists />
    },
    {
        path: 'create',
        element: <CreateEvent />
    }
]

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
        // only admin can access these routes
        {
            path: 'admin',
            children: [
                ...(adminRoutes || [])
            ]
        },
        // only poc can access these routes
        {
            path: 'poc',
            children: [
                ...(pocRoutes || [])
            ]
        },
        // only tenant can access these routes
        {
            path: 'tenant',
            children: [
                ...(tenantRoutes || [])
            ]
        },
        // admin and tenant can access these routes
        {
            path: 'event',
            children: [
                ...(adminAndTenantRoutes || [])
            ]
        },
        // all roles can access these routes
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
