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
            id: 'tenant',
            title: 'Ban tổ chức',
            type: 'collapse',
            icon: icons.IconBuilding,
            children: [
                {
                    id: 'view-tenant',
                    title: 'Thông tin ban tổ chức',
                    type: 'item',
                    url: '/tenant/view-tenants',
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default tenantRole;
