import React from "react";
import { Typography } from '@mui/material';
import MainCard from "../../../components/cards/MainCard";

const AboutUs = () => {
    return (
        <MainCard title='Giới thiệu'>
            <Typography variant="body2">
                <p>
                    Hệ thống được xây dựng bởi Lê Hà Hưng - sinh viên khoá 63 ngành Kỹ thuật máy tính - Đại học Bách khoa Hà Nội 
                    dưới sự dướng dẫn của giảng viên Nguyễn Đức Tiến - Bộ môn Kỹ thuật máy tính - Trường Công nghệ thông tin và truyền thông.
                </p>
                <p>
                    Thông tin liên hệ:
                </p>
            </Typography>
        </MainCard>
    );
}

export default AboutUs;
