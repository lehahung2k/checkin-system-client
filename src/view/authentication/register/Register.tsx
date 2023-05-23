import React, {useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import {
    Backdrop,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material";
import {Link} from "react-router-dom";
import './Register.scss'
import authApi from "../../../api/authApi";

interface RegisterFormValues {
    username: string;
    password: string;
    confirmPass: string;
    fullName: string;
    active: number;
    companyName: string;
    phoneNumber: string;
    email: string;
    role: string;
    tenantCode: string;
}

function Register() {
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFailure, setOpenFailure] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isPoc, setIsPoc] = useState(false);
    const navigate = useNavigate();

    const initialValues: RegisterFormValues = {
        username: "",
        password: "",
        confirmPass: "",
        fullName: "",
        active: 1,
        companyName: "",
        phoneNumber: "",
        email: "",
        role: "",
        tenantCode: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Tên đăng nhập không được để trống"),
        password: Yup.string().required("Mật khẩu không được để trống"),
        confirmPass: Yup.string().required("Nhập lại chính xác mật khẩu"),
        role: Yup.string().required("Role không được để trống"),
    });

    const handleRegister = (data: RegisterFormValues) => {
        console.log(data);
        setLoading(true);
        authApi
            .registerApi(data)
            .then((res) => {
                setLoading(false);
                setOpenSuccess(true);
                console.log(res.data.message);
            })
            .catch((e) => {
                if (e.response === undefined) alert('Network error')
                else alert(e.response.data.message);
                setOpenFailure(true);
            })
    };

    return (
        <div className="body">
            <div className="right-login">
                <div className="card-login">
                    <h1>ĐĂNG KÝ</h1>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleRegister}
                        validationSchema={validationSchema}
                    >
                        {({setFieldValue}) => (
                            <Form className="login-form">
                                <div className="form-group">
                                    <Field
                                        autoComplete="off"
                                        id="inputCreatePost"
                                        name="username"
                                        className="form-field"
                                        placeholder="Tên đăng nhập"
                                    />
                                    <ErrorMessage
                                        name="username"
                                        component="span"
                                        className="errorMsg"
                                    />
                                </div>

                                <div className="form-group">
                                    <Field
                                        autoComplete="off"
                                        type="password"
                                        id="inputCreatePost"
                                        name="password"
                                        className="form-field"
                                        placeholder="Mật khẩu"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="span"
                                        className="errorMsg"
                                    ></ErrorMessage>
                                </div>

                                <div className="form-group">
                                    <Field
                                        autoComplete="off"
                                        type="password"
                                        id="inputCreatePost"
                                        name="confirmPass"
                                        className="form-field"
                                        placeholder="Nhập lại mật khẩu"
                                    />
                                    <ErrorMessage
                                        name="confirmPass"
                                        component="span"
                                        className="errorMsg"
                                    ></ErrorMessage>
                                </div>

                                <div className="form-group">
                                    <Field
                                        autoComplete="off"
                                        id="inputCreatePost"
                                        name="fullName"
                                        className="form-field"
                                        placeholder="Họ và tên"
                                    />
                                    <ErrorMessage
                                        name="fullName"
                                        component="span"
                                        className="errorMsg"
                                    />
                                </div>

                                <div className="form-group">
                                    <Field
                                        autoComplete="off"
                                        id="inputCreatePost"
                                        name="phoneNumber"
                                        className="form-field"
                                        placeholder="Số điện thoại"
                                    />
                                    <ErrorMessage
                                        name="phoneNumber"
                                        component="span"
                                        className="errorMsg"
                                    />
                                </div>

                                <div className="form-group">
                                    <Field
                                        autoComplete="off"
                                        id="inputCreatePost"
                                        name="email"
                                        className="form-field"
                                        placeholder="Email"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="span"
                                        className="errorMsg"
                                    />
                                </div>

                                <div className="form-group">
                                    <Field
                                        autoComplete="off"
                                        id="inputCreatePost"
                                        name="companyName"
                                        className="form-field"
                                        placeholder="Tên công ty"
                                    />
                                    <ErrorMessage
                                        name="companyName"
                                        component="span"
                                        className="errorMsg"
                                    />
                                </div>

                                <div className="form-group">
                                    <Field
                                        as="select"
                                        id="inputCreatePost"
                                        name="role"
                                        className="form-field"
                                        onChange={(e: { target: { value: any; }; }) => {
                                            const selectedRole = e.target.value;
                                            setFieldValue("role", selectedRole);
                                            if (selectedRole === 'poc') setIsPoc(true);
                                            else setIsPoc(false);
                                        }}
                                    >
                                        <option value="" disabled>Bạn là:</option>
                                        <option value="tenant">Đối tác</option>
                                        <option value="poc">Quản lý gian hàng</option>
                                    </Field>
                                    <ErrorMessage
                                        name="role"
                                        component="span"
                                        className="errorMsg"
                                    />
                                </div>
                                {isPoc && (
                                    <div className="form-group">
                                        <Field
                                            autoComplete="off"
                                            id="inputCreatePost"
                                            name="tenantCode"
                                            className="form-field"
                                            placeholder="Mã ban tổ chức"
                                        />
                                        <ErrorMessage
                                            name="tenantCode"
                                            component="span"
                                            className="errorMsg"
                                        />
                                    </div>
                                )}

                                <button className="button" type="submit">
                                    Đăng ký
                                </button>
                                <div className="register">
                                    Nếu đã có tài khoản, hãy {<Link to="/auth/login">Đăng nhập</Link>}{" "}
                                    tại đây
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="center"></div>
                <div className="center-1"></div>
                <div className="center2"></div>
            </div>
            <Backdrop
                sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Dialog
                open={openSuccess}
                onClose={() => {
                    setOpenSuccess(false);
                    navigate("");
                }}
                aria-labelledby="responsive-dialog-title"
                maxWidth="sm"
            >
                <DialogContent>
                    <DialogContentText>
                        Đã đăng ký tài khoản thành công!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenSuccess(false);
                            navigate("auth/login");
                        }}
                        autoFocus
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openFailure}
                onClose={() => {
                    setOpenFailure(false);
                }}
                aria-labelledby="responsive-dialog-title"
                maxWidth="sm"
            >
                <DialogContent>
                    <DialogContentText>
                        Đăng ký tài khoản không thành công, xin hãy thử lại
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenFailure(false);
                            setLoading(false);
                        }}
                        autoFocus
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Register;
