import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

class EventApi {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/events-manager`,
            withCredentials: true,
            headers: {
                Accept: "*/*",
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
        });
    }
}

const eventApi = new EventApi();

export default eventApi;
