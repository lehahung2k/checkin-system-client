// assets

// constant
import {IconHelp} from "@tabler/icons-react";

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
            breadcrumbs: false
        },
        {
            id: 'documents',
            title: 'Tài liệu hướng dẫn',
            type: 'item',
            url: '/other/documents',
            icon: icons.IconHelp,
            breadcrumbs: false
        }
    ]
};

export default otherPages;
