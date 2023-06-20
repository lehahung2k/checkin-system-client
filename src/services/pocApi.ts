import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

interface PocData {
    pointCode: string;
    pointName: string;
    pointDescription: string;
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
        return this.api.post("/add-poc", data);
    }
}
const pocApi = new PocApi();
export default pocApi;
