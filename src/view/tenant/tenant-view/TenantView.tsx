import MainCard from "../../../components/cards/MainCard";
import React, {useEffect, useState} from "react";
import {Grid, IconButton, Tooltip} from "@mui/material";
import tenantApi from "../../../services/tenantApi";
import SubCard from "../../../components/cards/SubCard";
import {FileCopy, Launch} from "@mui/icons-material";
import SkeletonLoading from "../../../components/cards/SkeletonLoading";

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
    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };
    const handleWebsiteRedirect = (url: string) => {
        window.open(url, "_blank");
    };

    return (
        <MainCard title="Thông tin ban tổ chức">
            {tenantData ? (
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <SubCard title="Tên doanh nghiệp">
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <span>{tenantData.tenantName}</span>
                                <Tooltip title={'Copy'}>
                                    <IconButton
                                        aria-label="Copy to clipboard"
                                        onClick={() => handleCopyToClipboard(tenantData.tenantName)}
                                        sx={{marginLeft: "auto"}}
                                    >
                                        <FileCopy/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SubCard title="Mã doanh nghiệp">
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <span>{tenantData.tenantCode}</span>
                                <Tooltip title={'Copy'}>
                                    <IconButton
                                        aria-label="Copy to clipboard"
                                        onClick={() => handleCopyToClipboard(tenantData.tenantCode)}
                                        sx={{marginLeft: "auto"}}
                                    >
                                        <FileCopy/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SubCard title="Địa chỉ">
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <span>{tenantData.tenantAddress}</span>
                                <Tooltip title={'Copy'}>
                                    <IconButton
                                        aria-label="Copy to clipboard"
                                        onClick={() => handleCopyToClipboard(tenantData.tenantAddress)}
                                        sx={{marginLeft: "auto"}}
                                    >
                                        <FileCopy/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SubCard title="Website">
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <a href={tenantData.website} target="_blank" rel="noopener noreferrer">
                                    {tenantData.website}
                                </a>
                                <Tooltip title={'Open'}>
                                    <IconButton
                                        aria-label="Open website"
                                        onClick={() => handleWebsiteRedirect(tenantData.website)}
                                        sx={{marginLeft: "auto"}}
                                    >
                                        <Launch/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SubCard title="Người liên hệ">
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <span>{tenantData.contactName}</span>
                                <IconButton
                                    aria-label="Copy to clipboard"
                                    onClick={() => handleCopyToClipboard(tenantData.contactName)}
                                    sx={{marginLeft: "auto"}}
                                >
                                    <FileCopy/>
                                </IconButton>
                            </div>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SubCard title="Email">
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <span>{tenantData.contactEmail}</span>
                                <IconButton
                                    aria-label="Copy to clipboard"
                                    onClick={() => handleCopyToClipboard(tenantData.contactEmail)}
                                    sx={{marginLeft: "auto"}}
                                >
                                    <FileCopy/>
                                </IconButton>
                            </div>
                        </SubCard>
                    </Grid>
                    {/* Add other fields here */}
                </Grid>
            ) : (
                <SkeletonLoading/>
            )}
        </MainCard>
    );
};

export default TenantView;
