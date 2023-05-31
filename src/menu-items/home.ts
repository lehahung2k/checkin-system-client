// assets

// constant
import {IconHome} from "@tabler/icons-react";

const icons = { IconHome };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const homeAdmin = {
    id: 'home',
    title: 'Trang chủ',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Trang chủ',
            type: 'item',
            url: '/dashboard',
            icon: icons.IconHome,
            breadcrumbs: true
        }
    ]
};

export default homeAdmin;
