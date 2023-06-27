import { Grid, Typography } from '@mui/material';
import React from 'react';
import './Login.scss'
import { Link } from 'react-router-dom';

const ForgetPass = (props: any) => {
    return (
        <Grid container spacing={3} className='body'>
            <div className="right-login">
                <div className="card-login">
                    <h1 style={{ marginBottom: "1rem" }}>Quên mật khẩu?</h1>
                    <div className="form-group">
                        <Typography variant="h5" sx={{
                            border: '2px solid #CDD5DF',
                            padding: '15px',
                            borderRadius: '1rem',
                        }}>
                            Ôi bạn ơi, hãy ngồi xuống làm một ly trà hoặc nước cam và bình tĩnh nhớ lại mật khẩu nhé!<br />
                            Chứ mình chưa kịp viết tính năng này rồi🥲
                        </Typography>
                    </div>
                    <div className="register">
                        Nếu đã nhớ lại, hãy {<Link to="/auth/login">Đăng nhập</Link>} tại đây!
                    </div>
                    <div className="center1"></div>
                </div>
            </div>
        </Grid>
    );
}

export default ForgetPass;
