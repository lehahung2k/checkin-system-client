import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

class CheckRole {
    getRole = (): any => {
        const accessToken = Cookies.get('accessToken');

        try {
            if (accessToken != null) {
                const decodedToken: any = jwtDecode(accessToken);
                const role = decodedToken.role;
                if (role !== 'admin' && role !== 'tenant' && role !== 'poc') {
                    return null;
                }
                return role;
            }
        } catch (error) {
            return null;
        }
    };
}

const checkRole = new CheckRole();

export default checkRole;
