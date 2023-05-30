import axios, { AxiosResponse } from "axios";

const baseUrl = `${process.env.REACT_APP_BASE_URL}/auth`;

interface LoginData {
    username: string;
    password: string;
}

interface RegisterData {
    username: string;
    password: string;
    confirmPass: string;
    fullName: string;
    companyName: string;
    phoneNumber: string;
    email: string;
    tenantCode: string;
    role: string;
}

class AuthApi {
    loginApi = (data: LoginData): Promise<AxiosResponse> => {
        const loginUrl = `${baseUrl}/login`;
        return axios.post(loginUrl, data);
    };

    registerApi = (data: RegisterData): Promise<AxiosResponse> => {
        const registerUrl = `${baseUrl}/register`;
        return axios.post(registerUrl, data);
    };

}

const authApi = new AuthApi();
export default authApi;
