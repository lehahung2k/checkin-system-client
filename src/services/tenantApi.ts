import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = `${process.env.REACT_APP_BASE_URL}/tenants`;

class TenantApi {

    getDataFromTenantRole = async () => {
        const url = `${baseUrl}/check-tenant-exist`;
        const accessToken = Cookies.get("accessToken");
        
        return await axios.get(url, {
            withCredentials: true,
            headers: {
                Accept: "*/*",
                Authorization: `Bearer ${accessToken}`,
            }
        });
    };
}

const tenantApi = new TenantApi();

export default tenantApi;
