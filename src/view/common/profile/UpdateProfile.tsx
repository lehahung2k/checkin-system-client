import MainCard from "../../../components/cards/MainCard";
import React from "react";
import {Grid} from "@mui/material";
import SubCard from "../../../components/cards/SubCard";

const UpdateProfile = () => {
    const updateProfile = () => {

    }

    const changePassword = () => {

    }

    return (
        <MainCard title='Cài đặt tài khoản'>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <SubCard title={'Cập nhật thông tin cá nhân'}>
                        <Grid container spacing={3}></Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <SubCard title={'Đổi mật khẩu'}>
                        <Grid container spacing={3}></Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
}
export default UpdateProfile;
