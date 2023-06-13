import axios, {AxiosInstance} from "axios";
import Cookies from "js-cookie";

class EventsApi {
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

    getAllEvents = async () => {
        return this.api.get("/events");
    }
}
const eventsApi = new EventsApi();
export default eventsApi;