// assets

// constant
import {IconBuilding, IconCheckbox, IconCalendarEvent} from "@tabler/icons-react";

const icons = { IconCheckbox, IconCalendarEvent, IconBuilding };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const tenantRole = {
    id: 'tenant-role',
    type: 'group',
    children: [
        {
            id: 'tenant',
            title: 'Ban tổ chức',
            type: 'collapse',
            icon: icons.IconBuilding,
            children: [
                {
                    id: 'view-tenant',
                    title: 'Thông tin ban tổ chức',
                    type: 'item',
                    url: '/tenant/view-tenant',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'event',
            title: 'Sự kiện',
            type: 'collapse',
            icon: icons.IconCalendarEvent,
            children: [
                {
                    id: 'event-lists',
                    title: 'Danh sách sự kiện',
                    type: 'item',
                    url: '/event/lists',
                    breadcrumbs: true
                },
                {
                    id: 'event-create',
                    title: 'Tạo mới sự kiện',
                    type: 'item',
                    url: '/event/create',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'manage-poc',
            title: 'Quản lý điểm checkin',
            type: 'collapse',
            icon: icons.IconCheckbox,
            children: [
                {
                    id: 'poc-lists',
                    title: 'Danh sách điểm check-in',
                    type: 'item',
                    url: '/tenant/manage-poc',
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default tenantRole;
