import {AxiosInstance} from "axios";
import axios from "axios";
import Cookies from "js-cookie";

interface GuestData {
    guestCode: string;
    guestDescription: string;
    frontImg: string;
    backImg: string;
    identityType: string;
    pointCode: string;
}
class GuestApi {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/guests`,
            withCredentials: true,
            headers: {
                Accept: "*/*",
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
        });
    }

    checkinGuest = async (data: GuestData) => {
        return this.api.post("/event/checkin", data);
    }

    listGuest = async (pointCode: string) => {
        return this.api.get(`event/list-guests?pointCode=${pointCode}`);
    }

}
const guestApi = new GuestApi();
export default guestApi;
