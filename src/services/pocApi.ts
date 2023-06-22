import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

interface PocData {
    pointCode: string;
    eventCode: string
    pointName: string;
    pointNote: string;
}
class PocApi {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/point-of-checkin`,
            withCredentials: true,
            headers: {
                Accept: "*/*",
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
        });
    }

    getAllPocByTenant = async () => {
        return this.api.get('/poc');
    }

    addNewPoc = async (data: PocData) => {
        return this.api.post("/create", data);
    }

    getAllPocByPoc = async () => {
        return this.api.get('/poc/poc-view');
    }
}
const pocApi = new PocApi();
export default pocApi;
