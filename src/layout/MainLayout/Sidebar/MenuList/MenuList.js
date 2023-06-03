import { Typography } from '@mui/material';
import NavGroup from './NavGroup/NavGroup';
import menuItems from '../../../../menu-items/menuItems';
import menuItemAdmin from '../../../../menu-items/menuItemAdmin';
import menuItemPoc from '../../../../menu-items/menuItemPoc';
import menuItemTenant from "../../../../menu-items/menuItemTenant";
import checkRole from "../../../../services/checkRole";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const menuItemDefault = {
    items: []
};

const MenuList = () => {
    // Check role to navigate the sidebar
    const role = checkRole.getRole();
    let navItems = menuItems.items;

    switch (role) {
        case 'admin':
            navItems = menuItemAdmin.items;
            break;
        case 'tenant':
            navItems = menuItemTenant.items;
            break;
        case 'poc':
            navItems = menuItemPoc.items;
            break;
        default:
            navItems = menuItemDefault.items
            break;
    }

    const renderedNavItems = navItems.map((item) => {
        if (item.type === 'group') {
            return <NavGroup key={item.id} item={item} />;
        }

        return (
            <Typography key={item.id} variant="h6" color="error" align="center">
                Menu Items Error
            </Typography>
        );
    });

    return <>{renderedNavItems}</>;
};

export default MenuList;
