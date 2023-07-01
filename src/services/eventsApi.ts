import axios, {AxiosInstance} from "axios";
import Cookies from "js-cookie";

interface EventData {
    eventCode: string;
    eventName: string;
    eventDescription: string;
    startTime: Date;
    endTime: Date;
    eventImg: string;
}
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

    getEventsByAdmin = async () => {
        return this.api.get('');
    }

    getAllEvents = async () => {
        return this.api.get("/events");
    }

    addNewEvent = async (data: EventData) => {
        return this.api.post("/add-event", data);
    }

    getEventById = async (eventId: string) => {
        return this.api.get(`/events/view?eventId=${eventId}`);
    }

    getEventByEventCode = async (eventCode: string) => {
        return this.api.get(`/events/poc-view?eventCode=${eventCode}`);
    }

    getEventByPointCode = async (pointCode: string) => {
        return this.api.get(`/events/poc-code?pointCode=${pointCode}`);
    }
}
const eventsApi = new EventsApi();
export default eventsApi;
