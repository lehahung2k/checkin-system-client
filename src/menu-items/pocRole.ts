// assets

// constant
import {IconHome} from "@tabler/icons-react";

const icons = { IconHome };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const pocRole = {
    id: 'poc-role',
    title: 'Xem sự kiện',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Trang chủ',
            type: 'item',
            url: '/dashboard',
            icon: icons.IconHome,
            breadcrumbs: false
        }
    ]
};

export default pocRole;
