import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import Img from "../../../../assets/images/Frame-1729.webp";
import './Login.scss'
import authApi from "../../../../services/authApi";

// const AccessTokenContext = createContext<string | null>(null);

// const useAccessToken = () => useContext(AccessTokenContext);


const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [formErrors, setFormErrors] = useState({username: "", password: ""});
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const navigate = useNavigate();
    if (Cookies.get('accessToken'))  {
        navigate('/');
    }

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm()) {
            const data = {username: username, password: password};
            authApi
                .loginApi(data)
                .then((res) => {
                    const { accessToken, user } = res.data.payload;
                    setAccessToken(accessToken);
                    // Save accessToken to cookie and other to storage
                    Cookies.set('accessToken', accessToken);
                    localStorage.setItem('fullName', user.fullName);
                    switch (user.role) {
                        case 'admin': return navigate('');
                        case 'tenant': return navigate('/tenant');
                        case 'poc': return  navigate('/poc');
                        default: return navigate('/auth/login');
                    }
                })
                .catch((e) => {
                    if (e.response === undefined) alert('Network error');
                    else alert(e.response.data.message);
                })
        }
    };

    useEffect(() => {
        // Do something with the access token when it changes, e.g., redirect the user to a logged-in page
        if (accessToken) {
            window.location.reload();
            navigate('/');
        }
    }, [accessToken, navigate]);

    const validateForm = () => {
        let errors = {username: "", password: ""};
        let formIsValid = true;

        // Validate username
        if (!username) {
            formIsValid = false;
            errors.username = "Vui lòng nhập tên đăng nhập";
        }

        // Validate password
        if (!password) {
            formIsValid = false;
            errors.password = "Vui lòng nhập mật khẩu";
        }

        setFormErrors(errors);
        return formIsValid;
    };

    return (
        <div className="body">
            <div className="left-login">
                <h1 className="pageName">EVENT CHECK-IN MANAGEMENT</h1>
                <img src={Img} alt="Logo web" className="chart"/>
                <div className="center"></div>
            </div>
            <form className="right-login" onSubmit={handleLogin}>
                <div className="card-login">
                    <h1 style={{marginBottom: "1rem"}}>ĐĂNG NHẬP</h1>

                    <div className="form-group">
                        <input
                            className="form-field"
                            type="text"
                            placeholder="Tên đăng nhập"
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                        />
                        {formErrors.username && (
                            <div className="invalid-feedback">{formErrors.username}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <input
                            className="form-field"
                            type="password"
                            placeholder="Mật khẩu"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                        {formErrors.password && (
                            <div className="invalid-feedback">{formErrors.password}</div>
                        )}
                    </div>
                    <button className="button">
                        <div>ĐĂNG NHẬP</div>
                    </button>
                    <div className="register">
                        Nếu chưa có tài khoản, hãy {<Link to="/auth/register">Đăng ký</Link>} tại
                        đây
                    </div>
                </div>
                <div className="center1"></div>
            </form>
        </div>
    );
}

export default Login;
