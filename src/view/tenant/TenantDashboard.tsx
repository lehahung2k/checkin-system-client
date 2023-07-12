import React, { useEffect, useState } from 'react';
import tenantApi from "../../services/tenantApi";
import { useNavigate } from 'react-router';
import {Grid, Typography} from '@mui/material';
import MainCard from '../../components/cards/MainCard';
import SkeletonLoading from "../../components/cards/SkeletonLoading";

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
                if (res.data.payload !== null) setTenantExists(true);
                else
                    showAlertAndRedirect(
                        'Doanh nghiệp của bạn chưa tồn tại, tạo ngay',
                        '/tenant/create-tenant'
                    );
            })
            .catch((e) => {
                setTenantExists(false);
                console.log(e)
            });
    };

    return (
        <>
            {!tenantExists ? (
                <MainCard title='Chào mừng đến với trang quản trị của doanh nghiệp đối tác'>
                    <SkeletonLoading/>
                </MainCard>
            ) : (
                <MainCard title='Chào mừng đến với trang quản trị của doanh nghiệp đối tác'>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h1> Doashboard </h1>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

export default TenantDashboard;
