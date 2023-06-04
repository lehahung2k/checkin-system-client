import MainCard from "../../../components/cards/MainCard";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import tenantApi from "../../../services/tenantApi";
import SubCard from "../../../components/cards/SubCard";

const TenantView = () => {
    const [tenantData, setTenantData] = useState<any>(null);

    useEffect(() => {
        getTenantData();
    }, []);

    const getTenantData = () => {
        // Call API here
        tenantApi
            .getDataFromTenantRole()
            .then((res) => {
                console.log("Tenant data:", res.data.payload);
                setTenantData(res.data.payload); // Assuming the API response contains the tenant data object
            })
            .catch((error) => {
                console.log("Error retrieving tenant data:", error);
            });
    };

    return (
        <MainCard title="Thông tin ban tổ chức">
            {tenantData && (
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <SubCard title="Tên doanh nghiệp">
                            {tenantData.tenantName}
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SubCard title="Mã doanh nghiệp">
                            {tenantData.tenantCode}
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SubCard title="Địa chỉ">
                            {tenantData.tenantAddress}
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SubCard title="Website">{tenantData.website}</SubCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SubCard title="Người liên hệ">{tenantData.contactName}</SubCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SubCard title="Email">{tenantData.contactEmail}</SubCard>
                    </Grid>
                    {/* Add other fields here */}
                </Grid>
            )}
        </MainCard>
    );
};

export default TenantView;
