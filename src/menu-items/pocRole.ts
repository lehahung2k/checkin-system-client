// assets

// constant
import { IconCheckbox, IconLiveView } from "@tabler/icons-react";

const icons = { IconCheckbox, IconLiveView };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const pocRole = {
    id: 'poc-role',
    type: 'group',
    children: [
        {
            id: 'manage-poc',
            title: 'Quản lý quầy',
            type: 'collapse',
            icon: icons.IconCheckbox,
            children: [
                {
                    id: 'poc-info',
                    title: 'Thông tin quầy',
                    type: 'item',
                    url: '/poc/view-poc',
                    breadcrumbs: true
                },
                {
                    id: 'create-poc',
                    title: 'Tạo mới quầy check-in',
                    type: 'item',
                    url: '/poc/create-poc',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'poc',
            title: 'Check-in',
            type: 'collapse',
            icon: icons.IconLiveView,
            children: [
                {
                    id: 'poc-lists',
                    title: 'Check-in',
                    type: 'item',
                    url: '/poc/checkin',
                    breadcrumbs: false
                },
                {
                    id: 'view-guests',
                    title: 'Danh sách khách check-in',
                    type: 'item',
                    url: '/poc/view-guests',
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default pocRole;
