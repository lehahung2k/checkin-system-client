import MainCard from "../../components/cards/MainCard";
import React from "react";
import {Typography} from "@mui/material";

const AdminDashboard = () => {
    return (
        <MainCard title={"Chào mừng đến với trang quản trị của hệ thống"}>
            <Typography variant="body2">
                Hello world
            </Typography>
        </MainCard>
    );
}

export default AdminDashboard;
