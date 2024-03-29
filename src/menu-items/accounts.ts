import { IconUser } from "@tabler/icons-react";
const icons = { IconUser };

const accountsPage = {
    id: 'accounts',
    type: 'group',
    children: [
        {
            id: 'account',
            title: 'Tài khoản',
            type: 'collapse',
            icon: icons.IconUser,
            children: [
                {
                    id: 'profile',
                    title: 'Thông tin cá nhân',
                    type: 'item',
                    url: '/user/account/profile',
                    breadcrumbs: true
                },
                {
                    id: 'setting',
                    title: 'Cài đặt tài khoản',
                    type: 'item',
                    url: '/user/account/settings',
                    breadcrumbs: true
                }
            ]
        }
    ]
}

export default accountsPage;
