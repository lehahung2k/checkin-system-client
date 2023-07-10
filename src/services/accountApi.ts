import axios, {AxiosInstance} from "axios";
import Cookies from "js-cookie";
import {date} from "yup";

interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
}

interface ProfileData {
    fullName: string;
    phoneNumber: string;
    email: string;
}

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

    getAccountInfo = async () => {
        return this.api.get("/details");
    }
    getTenantAccounts = async () => {
        return this.api.get("/tenant");
    }
    updateProfile = async (profile: ProfileData) => {
        return this.api.post("/update-profile", profile);
    }

    changePassword = async (newPass: ChangePasswordData) => {
        return this.api.post("/change-password", newPass);
    }
}
const accountApi = new AccountApi();
export default accountApi;
