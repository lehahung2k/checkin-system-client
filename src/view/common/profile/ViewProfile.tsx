import MainCard from "../../../components/cards/MainCard";
import accountApi from "../../../services/accountApi";
import React from "react";
import {Grid} from "@mui/material";

const ViewProfile = () => {
    const [profile, setProfile] = React.useState<any>({});
    const getProfile = () => {
        accountApi
            .getAccountInfo()
            .then((res) => {
                setProfile(res.data.payload);
            })
            .catch((err) => {
                console.log("Error retrieving profile data:", err.response.data);
            });
    }
    React.useEffect(() => {
        getProfile();
    }, []);
    return (
    <MainCard title='Xem thông tin cá nhân'>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <p><b>Tên đăng nhập:</b> {profile.username}</p>
                <p><b>Họ và tên:</b> {profile.fullName}</p>
                <p><b>Email:</b> {profile.email}</p>
                <p><b>Số điện thoại:</b> {profile.phoneNumber}</p>
            </Grid>
        </Grid>
    </MainCard>
  );
};
export default ViewProfile;
