// assets

// constant
import { IconHelp } from "@tabler/icons-react";

const icons = { IconHelp };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const otherPages = {
    id: 'other',
    type: 'group',
    children: [
        {
            id: 'about-us',
            title: 'Giới thiệu',
            type: 'item',
            url: '/other/about-us',
            icon: icons.IconHelp,
            breadcrumbs: true
        },
        {
            id: 'documents',
            title: 'Tài liệu hướng dẫn',
            type: 'item',
            url: '/other/helps',
            icon: icons.IconHelp,
            breadcrumbs: true
        }
    ]
};

export default otherPages;
