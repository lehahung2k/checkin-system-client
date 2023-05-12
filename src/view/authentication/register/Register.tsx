import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
    Backdrop,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material";
import { Link } from "react-router-dom";
import './Register.scss'

interface RegisterFormValues {
    username: string;
    password: string;
    fullName: string;
    active: number;
    role: string;
    companyName: string;
    phoneNumber: string;
    email: string;
    tenantCode: string;
}

function Register() {
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFailure, setOpenFailure] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const initialValues: RegisterFormValues = {
        username: "",
        password: "",
        fullName: "",
        active: 0,
        role: "poc",
        companyName: "",
        phoneNumber: "",
        email: "",
        tenantCode: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required(),
        tenantCode: Yup.string().required(),
    });

    const onSubmit = (data: RegisterFormValues) => {
        console.log(data);
        setLoading(true);
        console.log('Register work!')
    };

    // @ts-ignore
    return (
        <div className="body">
            <div className="right-login">
                <div className="card-login">
                    <h1>REGISTER</h1>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
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
                                    render={(msg) => (
                                        <span className="errorMsg">
                      Tên đăng nhập không được để trống
                    </span>
                                    )}
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
                                    render={(msg) => (
                                        <span className="errorMsg">
                      Mật khẩu không được để trống
                    </span>
                                    )}
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
                                    placeholder="Mail"
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
                                    render={(msg) => (
                                        <span className="errorMsg">
                      Mã ban tổ chức không được để trống
                    </span>
                                    )}
                                />
                            </div>

                            <button className="button" type="submit">
                                Đăng ký
                            </button>
                            <div className="register">
                                Nếu đã có tài khoản, hãy {<Link to="/auth/login">Đăng nhập</Link>}{" "}
                                tại đây
                            </div>
                        </Form>
                    </Formik>
                </div>
                <div className="center"></div>
                <div className="center1"></div>
                <div className="center2"></div>
            </div>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Dialog
                open={openSuccess}
                onClose={() => {
                    setOpenSuccess(false);
                    navigate("/login");
                }}
                aria-labelledby="responsive-dialog-title"
                maxWidth="sm"
            >
                <DialogContent>
                    <DialogContentText>
                        Đã đăng ký tài khoản thành công, xin liên hệ với ban tổ chức để kích
                        hoạt tài khoản
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenSuccess(false);
                            navigate("/login");
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
                        Đã đăng ký tài khoản không thành công, xin hãy thử lại
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenFailure(false);
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
