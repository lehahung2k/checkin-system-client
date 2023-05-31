// assets

// constant
import { IconBuilding, IconCheckbox, IconCalendarEvent } from "@tabler/icons-react";

const icons = { IconBuilding, IconCheckbox, IconCalendarEvent };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //
// url phải có / ở trước để breadcrumb hoạt động

const adminRole = {
    id: 'admin-role',
    type: 'group',
    children: [
        {
            id: 'event',
            title: 'Sự kiện',
            type: 'collapse',
            icon: icons.IconCalendarEvent,
            children: [
                {
                    id: 'event-list',
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
            id: 'tenant',
            title: 'Ban tổ chức',
            type: 'collapse',
            icon: icons.IconBuilding,
            children: [
                {
                    id: 'tenant-list',
                    title: 'Danh sách ban tổ chức',
                    type: 'item',
                    url: '/admin/tenant-lists',
                    breadcrumbs: true
                },
                {
                    id: 'create-tenant',
                    title: 'Tạo mới ban tổ chức',
                    type: 'item',
                    url: '/admin/create-tenant',
                    breadcrumbs: true
                }
            ]
        },
        {
            id: 'poc',
            title: 'Quầy check-in',
            type: 'collapse',
            icon: icons.IconCheckbox,
            children: [
                {
                    id: 'poc-list',
                    title: 'Danh sách quầy',
                    type: 'item',
                    url: '/admin/poc-lists',
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default adminRole;
