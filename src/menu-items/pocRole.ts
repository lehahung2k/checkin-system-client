// assets

// constant
import { IconCheckbox, IconLiveView, IconDevices } from "@tabler/icons-react";

const icons = { IconCheckbox, IconLiveView, IconDevices };

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
        },
        {
            id: 'device',
            title: 'Quản lý thiết bị',
            type: 'collapse',
            icon: icons.IconDevices,
            children: [
                {
                    id: 'device-lists',
                    title: 'Danh sách thiết bị',
                    type: 'item',
                    url: '/poc/device-lists',
                    breadcrumbs: true
                },
                {
                    id: 'device-assign',
                    title: 'Gán thiết bị',
                    type: 'item',
                    url: '/poc/device-assign',
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default pocRole;
