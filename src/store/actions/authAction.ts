import Cookies from "js-cookie";

export const LOGIN = (accessToken: string, user: any) => {
    Cookies.set("accessToken", accessToken);
    Cookies.set("user", JSON.stringify(user));
    window.location.reload();
    return {
        type: "LOGIN",
        payload: {
            accessToken,
            user,
        },
    };
}

export const LOGOUT = () => {
    Cookies.remove("accessToken");
    Cookies.remove("user");
    // window.location.reload();
    return {
        type: "LOGOUT",
    };
}
