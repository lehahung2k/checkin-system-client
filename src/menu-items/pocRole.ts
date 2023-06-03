// assets

// constant
import {IconCheckbox} from "@tabler/icons-react";

const icons = { IconCheckbox };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const pocRole = {
    id: 'poc-role',
    type: 'group',
    children: [
        {
            id: 'poc',
            title: 'Quầy check-in',
            type: 'collapse',
            icon: icons.IconCheckbox,
            children: [
                {
                    id: 'poc-lists',
                    title: 'Danh sách sự kiện',
                    type: 'item',
                    url: '/poc/checkin',
                    breadcrumbs: true
                },
                {
                    id: 'view-guests',
                    title: 'Danh sách khách checkin',
                    type: 'item',
                    url: '/poc/view-guests',
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default pocRole;
