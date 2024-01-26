import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Img from "../../../../assets/images/Frame-1729.webp";
import './Login.scss'
import authApi from "../../../../services/authApi";
import MuiNotification from "../../../../components/Notification";
import {useDispatch, useSelector} from "react-redux";
import {LOGIN} from "../../../../store/actions/authAction";

const Login = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [formErrors, setFormErrors] = useState({ username: "", password: "" });
    const [rememberMe, setRememberMe] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
    const [successMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const handleSnackbarClose = () => {
        setIsSnackbarOpen(false);
    };

    const navigate = useNavigate();

    const userInfo = useSelector((state: any) => state.auth.user);

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm()) {
            const data = { username: username, password: password };
            authApi
                .loginApi(data)
                .then((res) => {
                    const { accessToken, user } = res.data.payload;
                    dispatch(LOGIN(accessToken, user));
                    localStorage.setItem('fullName', user.fullName);
                    localStorage.setItem('companyName', user.companyName);
                })
                .catch((e) => {
                    setIsSnackbarOpen(true);
                    if (e.response === undefined) setErrorMessage("Lỗi kết nối đến máy chủ");
                    else setErrorMessage(e.response.data.message);
                })
        }
    };

    useEffect(() => {
        if (userInfo.role) {
            navigate("/", { replace: true });
        }
        else navigate("/auth/login", { replace: true });
    }, [userInfo]);

    const validateForm = () => {
        let errors = { username: "", password: "" };
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
                <img src={Img} alt="Logo web" className="chart" />
                <div className="center"></div>
            </div>
            <form className="right-login" onSubmit={handleLogin}>
                <div className="card-login">
                    <h1 style={{ marginBottom: "1rem" }}>ĐĂNG NHẬP</h1>

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
                    <div className="inline-container">
                        <label>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(event) => setRememberMe(event.target.checked)}
                            />
                            Ghi nhớ đăng nhập
                        </label>
                        <Link to="/auth/forgot-password" className="forgot-password">
                            Quên mật khẩu?
                        </Link>
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
            <MuiNotification
                isOpen={isSnackbarOpen}
                successMessage={successMessage}
                errorMessage={errorMessage}
                onClose={handleSnackbarClose}
            />
        </div>
    );
}

export default Login;
