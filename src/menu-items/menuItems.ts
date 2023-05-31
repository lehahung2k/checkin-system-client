import homePage from './home';
import adminRole from "./adminRole";
import Cookies from "js-cookie";
import {JwtDecodeOptions} from "jwt-decode";
import otherPages from "./others";
// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [homePage, adminRole, otherPages]
};

export default menuItems;
