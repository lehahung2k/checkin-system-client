import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Img from "../../../assets/images/Frame-1729.webp";
import './Login.scss'
import authApi from "../../../api/authApi";

const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [formErrors, setFormErrors] = useState({username: "", password: ""});

    const navigate = useNavigate();

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm()) {
            const data = {username: username, password: password};
            console.log(data);
            authApi
                .loginApi(data)
                .then((res) => {
                    sessionStorage.setItem('accessToken', res.data.token);
                    sessionStorage.setItem('role', res.data.role);
                    sessionStorage.setItem('name', res.data.fullName);
                    navigate('/');
                })
                .catch((e) => {
                    if (e.response === undefined) alert('Network error');
                    else alert(e.response.data.message);
                })
        }
        // authApi
        //   .loginApi(data)
        //   .then((response) => {
        //     if (response.data.error)
        //       return alert("Mật khẩu hoặc tên đăng nhập không đúng");
        //     sessionStorage.setItem("accessToken", response.data.accessToken);
        //     sessionStorage.setItem("role", response.data.userRole);
        //     console.log("Access token: " + response.data.accessToken);
        //     console.log("User Role: " + response.data.userRole);
        //     switch (response.data.userRole) {
        //       case "admin": {
        //         return navigate("/admin");
        //       }
        //       case "tenant": {
        //         return navigate("/event-admin");
        //       }
        //       case "poc": {
        //         return navigate("/poc");
        //       }
        //       default: {
        //         return navigate("/");
        //       }
        //     }
        //   })
        //   .catch((error) => {
        //     alert(error.message);
        //   });
    };

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
                    <h1>ĐĂNG NHẬP</h1>

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
