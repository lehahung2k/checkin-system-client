import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

interface TenantData {
    tenantCode: string;
    tenantName: string;
    tenantAddress: string;
    website: string;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
}

class TenantApi {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/tenants`,
            withCredentials: true,
            headers: {
                Accept: "*/*",
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
        });
    }

    getDataFromTenantRole = async () => {
        return this.api.get("/get-tenant");
    };

    createTenant = async (data: TenantData) => {
        return this.api.post("/create", data);
    };

    generateTenantCode = () => {
        // Thuật toán sinh mã ngẫu nhiên sử dụng phương pháp Fisher-Yates
        // tham khảo tại: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
        const characters: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
        const charactersArray: string[] = characters.split('');
        let code: string = '';

        for (let i = charactersArray.length - 1; i > 0; i--) {
            const randomIndex: number = Math.floor(Math.random() * (i + 1));
            [charactersArray[i], charactersArray[randomIndex]] = [charactersArray[randomIndex], charactersArray[i]];
        }

        code = charactersArray.slice(0, 6).join('');

        return code;
    };
}

const tenantApi = new TenantApi();

export default tenantApi;
