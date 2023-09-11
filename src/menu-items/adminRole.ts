import { IconBuilding, IconCheckbox, IconCalendarEvent, IconSum } from "@tabler/icons-react";

const icons = { IconBuilding, IconCheckbox, IconCalendarEvent, IconSum };

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
                    url: '/event/event-lists',
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
        },
        {
            id: 'summary',
            title: 'Thống kê',
            type: 'collapse',
            icon: icons.IconSum,
            children: [
                {
                    id: 'summary',
                    title: 'Thống kê',
                    type: 'item',
                    url: '/admin/summary',
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default adminRole;
