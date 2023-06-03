import React, { useEffect, useState } from 'react';
import tenantApi from "../../services/tenantApi";
import { useNavigate } from 'react-router';
import { Typography } from '@mui/material';
import MainCard from '../../components/cards/MainCard';

const TenantDashboard = () => {
    const [tenantExists, setTenantExists] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkTenantExist();
    }, []);

    const showAlertAndRedirect = (message: string, redirectPath: string) => {
        alert(message);
        setTimeout(() => {
            navigate(redirectPath);
        }, 1000); // Redirect after 1 seconds
    };

    const checkTenantExist = () => {
        tenantApi
            .getDataFromTenantRole()
            .then((res) => {
                if (res.data.payload) setTenantExists(true);
                else
                    showAlertAndRedirect(
                        'Doanh nghiệp của bạn chưa tồn tại, tạo ngay',
                        '/tenant/create-tenant'
                    );
            })
            .catch((e) => {
                setTenantExists(false);
            });
    };

    return (
        <>
            {!tenantExists ? (
                <p>Tenant doesn't exist. You must create first!</p>
            ) : (
                <MainCard title='Chào mừng đến với trang quản trị của doanh nghiệp đối tác'>
                    <Typography variant="body2">
                        Hello world
                    </Typography>
                </MainCard>
            )}
        </>
    );
};

export default TenantDashboard;
