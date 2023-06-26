import MainCard from "../../../components/cards/MainCard";
import {Button, Grid, List, ListItem, ListItemButton, ListItemText, Tooltip, Typography} from "@mui/material";
import SubCard from "../../../components/cards/SubCard";
import accountApi from "../../../services/accountApi";
import React, {useEffect, useState} from "react";
import SkeletonLoading from "../../../components/cards/SkeletonLoading";
import {FileCopy} from "@mui/icons-material";
import pocApi from "../../../services/pocApi";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {IconEye} from "@tabler/icons-react";

interface PocData {
    pointId: string;
    pointCode: string;
    pointName: string;
    pointNote: string;
    eventCode: string;
    username: string;
    enabled: boolean;
}

const PocInfo = () => {
    const [pocAccountData, setPocAccountData] = useState<any>(null);
    const [pocData, setPocData] = useState<PocData[]>([]);
    const copyToClipboard = (text : string) => {
        navigator.clipboard.writeText(text);
    };
    const getPocAccountData = () => {
        accountApi
            .getAccountInfo()
            .then((res) => {
                setPocAccountData(res.data.payload);
            })
            .catch ((err) => {
                console.log("Error retrieving POC data:", err.response.data);
            });
    }

    useEffect(() => {
        getPocAccountData();
    }, []);

    const getAllPoc = () => {
        pocApi
            .getAllPocByPoc()
            .then((res) => {
                setPocData(res.data.payload);
            })
            .catch ((err) => {
                console.log("Error retrieving POC data:", err.response.data);
            })
    }

    useEffect(() => {
        getAllPoc();
    }, []);

    const columns: GridColDef[] = [
        { field: 'id', headerName: '#', minWidth: 50, flex: 0.02 },
        { field: 'pointName', headerName: 'Tên quầy check-in', minWidth: 150, flex: 0.1 },
        { field: 'eventCode', headerName: 'Mã sự kiện', minWidth: 150, flex: 0.1 },
        { field: 'pointCode', headerName: 'Mã quầy', minWidth: 150, flex: 0.1},
        { field: 'pointNote', headerName: 'Ghi chú', minWidth: 150, flex: 0.2 },
        { field: 'status', headerName: 'Trạng thái', minWidth: 150, flex: 0.1 },
        { field: 'viewDetails', headerName: 'Chi tiết', minWidth: 100, renderCell: (params) => (
                <Button
                    onClick={() => {}}
                    endIcon={<IconEye />}
                >
                </Button>
            )}
    ];

    const rows = pocData.map((poc: any, index) => {
        return {
            id: index + 1,
            pointName: poc.pointName,
            eventCode: poc.eventCode,
            pointCode: poc.pointCode,
            pointNote: poc.pointNote,
            status: poc.enabled ? 'Đang hoạt động' : 'Ngừng hoạt động',
            viewDetails: poc.pointId
        }
    });

    return (
        <MainCard title={'Thông tin cơ bản'}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SubCard title={'Thông tin tài khoản POC'}>
                        <Grid container spacing={3}>
                            {pocAccountData ? (
                                <>
                                    <Grid item xs={12} md={4}>
                                        <List>
                                            <ListItem disablePadding>
                                                <ListItemButton onClick={() => copyToClipboard(pocAccountData.fullName)}>
                                                    <ListItemText primaryTypographyProps={{ variant: 'subtitle1', gutterBottom: true }}>
                                                        <b>Tên tài khoản:</b> {pocAccountData.fullName}
                                                    </ListItemText>
                                                    <Typography variant="body2" color="textSecondary">
                                                        <Tooltip title={'Copy'}>
                                                            <FileCopy/>
                                                        </Tooltip>
                                                    </Typography>
                                                </ListItemButton>
                                            </ListItem>
                                            <ListItem disablePadding>
                                                <ListItemButton onClick={() => copyToClipboard(pocAccountData.phoneNumber)}>
                                                    <ListItemText primaryTypographyProps={{ variant: 'subtitle1', gutterBottom: true }}>
                                                        <b>Số điện thoại:</b> {pocAccountData.phoneNumber}
                                                    </ListItemText>
                                                    <Typography variant="body2" color="textSecondary">
                                                        <Tooltip title={'Copy'}>
                                                            <FileCopy/>
                                                        </Tooltip>
                                                    </Typography>
                                                </ListItemButton>
                                            </ListItem>
                                        </List>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <List>
                                            <ListItem disablePadding>
                                                <ListItemButton onClick={()=>copyToClipboard(pocAccountData.username)}>
                                                    <ListItemText primaryTypographyProps={{ variant: 'subtitle1', gutterBottom: true }}>
                                                        <b>Tên đăng nhập:</b> {pocAccountData.username}
                                                    </ListItemText>
                                                    <Typography variant="body2" color="textSecondary">
                                                        <Tooltip title={'Copy'}>
                                                            <FileCopy/>
                                                        </Tooltip>
                                                    </Typography>
                                                </ListItemButton>
                                            </ListItem>
                                            <ListItem disablePadding>
                                                <ListItemButton onClick={() => copyToClipboard(pocAccountData.email)}>
                                                    <ListItemText primaryTypographyProps={{ variant: 'subtitle1', gutterBottom: true }}>
                                                        <b>Email liên hệ:</b> {pocAccountData.email}
                                                    </ListItemText>
                                                    <Typography variant="body2" color="textSecondary">
                                                        <Tooltip title={'Copy'}>
                                                            <FileCopy/>
                                                        </Tooltip>
                                                    </Typography>
                                                </ListItemButton>
                                            </ListItem>
                                        </List>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <List>
                                            <ListItem disablePadding>
                                                <ListItemButton onClick={() => copyToClipboard(pocAccountData.companyName)}>
                                                    <ListItemText primaryTypographyProps={{ variant: 'subtitle1', gutterBottom: true }}>
                                                        <b>Tên công ty:</b> {pocAccountData.companyName}
                                                    </ListItemText>
                                                    <Typography variant="body2" color="textSecondary">
                                                        <Tooltip title={'Copy'}>
                                                            <FileCopy/>
                                                        </Tooltip>
                                                    </Typography>
                                                </ListItemButton>
                                            </ListItem>
                                            <ListItem disablePadding>
                                                <ListItemButton onClick={() => copyToClipboard(pocAccountData.tenantCode)}>
                                                    <ListItemText primaryTypographyProps={{ variant: 'subtitle1', gutterBottom: true }}>
                                                        <b>Mã doanh nghiệp được cấp:</b> {pocAccountData.tenantCode}
                                                    </ListItemText>
                                                    <Typography variant="body2" color="textSecondary">
                                                        <Tooltip title={'Copy'}>
                                                            <FileCopy/>
                                                        </Tooltip>
                                                    </Typography>
                                                </ListItemButton>
                                            </ListItem>
                                        </List>
                                    </Grid>
                                </>
                            ):(
                                <SkeletonLoading/>
                            )}
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12}>
                    <SubCard title={'Thông tin quầy hàng'}>
                        <Grid container spacing={3}>
                            {pocData ? (
                                <>
                                    <Grid item xs={12}>
                                        <DataGrid
                                            rows={rows}
                                            columns={columns}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { page: 0, pageSize: 5 },
                                                },
                                            }}
                                            pageSizeOptions={[5, 10, 15]}
                                        />
                                    </Grid>
                                </>
                                ) : (
                                <SkeletonLoading/>
                            )}
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
}
export default PocInfo;
