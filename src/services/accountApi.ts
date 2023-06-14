import axios, {AxiosInstance} from "axios";
import Cookies from "js-cookie";

class AccountApi{
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/accounts`,
            withCredentials: true,
            headers: {
                Accept: "*/*",
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
        });
    }

    getTenantAccounts = async () => {
        return this.api.get("/tenant");
    }
}
const accountApi = new AccountApi();
export default accountApi;
