import {
    Backdrop,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogContentText,
    Grid,
} from '@mui/material';
import React, {useState} from 'react';
import '../register/Register.scss'
import authApi from "../../../../services/authApi";
import {useNavigate} from "react-router";
import * as Yup from "yup";
import {Link} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from 'formik';

interface ForgetPassFormValues {
    newPassword: string;
    confirmPassword: string;
    confirmMailToken: string;
}

const ForgetPass = (props: any) => {
    const [openSuccess, setOpenSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [resMessage, setResMessage] = useState("");

    const initialFormValues: ForgetPassFormValues = {
        newPassword: "",
        confirmPassword: "",
        confirmMailToken: ""
    }

    const validateForm = Yup.object().shape({
        newPassword: Yup.string()
            .required('Mật khẩu mới không được để trống')
            .min(8, 'Mật khẩu mới phải có ít nhất 8 ký tự'),
        confirmPassword: Yup.string().required('Nhập lại mật khẩu')
            .oneOf([Yup.ref('newPassword'), ''], 'Mật khẩu không khớp'),
        confirmMailToken: Yup.string().required('Mã xác nhận không được để trống')
    });

    const navigate = useNavigate();
    const handlePasswordReset = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        authApi
            .forgetPassApi(email)
            .then((res) => {
                setLoading(false);
                setOpenSuccess(true);
                setResMessage(res.data.message);
            })
            .catch((e) => {
                setLoading(false);
                alert(e.response.data.message);
            })
    }

    const handleNewPassword = (data: ForgetPassFormValues) => {
        authApi
            .confirmForgotPassApi(data)
            .then((res) => {
                alert(res.data.message);
                navigate("/auth/login");
            })
            .catch((e) => {
                alert(e.response.data.message);
            })
    }

    return (
        <Grid container spacing={3} className='body'>
            <div className="register-form">
                <form className="card-register" onSubmit={handlePasswordReset}>
                    <h1 style={{ marginBottom: "1rem" }}>Quên mật khẩu?</h1>
                    <div className="form-group">
                        {/*<Typography variant="h5" sx={{*/}
                        {/*    border: '2px solid #CDD5DF',*/}
                        {/*    padding: '15px',*/}
                        {/*    borderRadius: '1rem',*/}
                        {/*}}>*/}
                        {/*    Ôi bạn ơi, hãy ngồi xuống làm một ly trà hoặc nước cam và bình tĩnh nhớ lại mật khẩu nhé!<br />*/}
                        {/*    Chứ mình chưa kịp viết tính năng này rồi🥲*/}
                        {/*</Typography>*/}
                        <label className={"form-label"}>Nhập email của bạn:</label>
                        <input
                            className="form-field"
                            type="email"
                            placeholder="Email"
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                        <button className="button">
                            <div>Gửi yêu cầu</div>
                        </button>
                    </div>
                    <div className="register">
                        Nếu đã nhớ lại, hãy {<Link to="/auth/login">Đăng nhập</Link>} tại đây!
                    </div>
                    <div className="center1"></div>
                </form>
            </div>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Dialog
                open={openSuccess}
                onClose={() => setOpenSuccess(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {resMessage}
                        <Formik
                            initialValues={initialFormValues}
                            onSubmit={handleNewPassword}
                            validationSchema={validateForm}
                        >
                            {({ setFieldValue }) => (
                                <Form style={{width: '100%'}}>
                                    <div className="form-group">
                                        <label className={"form-label"}>Mật khẩu mới:</label>
                                        <Field
                                            className="form-field"
                                            type="password"
                                            name="newPassword"
                                            placeholder="Mật khẩu mới"
                                        />
                                        <ErrorMessage
                                            name="newPassword"
                                            component="span"
                                            className="errorMsg"
                                            ></ErrorMessage>
                                    </div>
                                    <div className="form-group">
                                        <label className={"form-label"}>Nhập lại mật khẩu mới:</label>
                                        <Field
                                            className="form-field"
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Nhập lại mật khẩu mới"
                                        />
                                        <ErrorMessage
                                            name="confirmPassword"
                                            component="span"
                                            className="errorMsg"
                                        ></ErrorMessage>
                                    </div>
                                    <div className="form-group">
                                        <label className={"form-label"}>Nhập mã xác nhận:</label>
                                        <Field
                                            className="form-field"
                                            type="text"
                                            name="confirmMailToken"
                                            placeholder="Mã xác nhận"
                                        />
                                        <ErrorMessage
                                            name="confirmMailToken"
                                            component="span"
                                            className="errorMsg"
                                            ></ErrorMessage>
                                    </div>
                                    <button className="button" type="submit">
                                        <div>Đổi mật khẩu</div>
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </Grid>
    );
}

export default ForgetPass;
