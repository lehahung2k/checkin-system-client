import MainCard from "../../../components/cards/MainCard";
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, Typography} from "@mui/material";
import accountApi from "../../../services/accountApi";
import React, {useEffect, useState} from "react";
import SubCard from "../../../components/cards/SubCard";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchBoxAction from "../../../components/cards/SearchBoxAction";

interface TenantAccountData {
    userId: number;
    username: string;
    fullName: string;
    email: string;
    companyName: string;
    active: boolean;
}

const TenantLists = () => {
    const [tenants, setTenants] = useState<TenantAccountData[]>([]);
    const [index, setIndex] = useState(0);

    const getTenants = () => {
        accountApi
            .getTenantAccounts()
            .then((res) => {
                const tenants = res.data.payload;
                console.log(tenants);
                setTenants(tenants);
                setIndex(0);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }

    useEffect(() => {
        getTenants();
    }, []);

    const handleFilter = () => {

    }

    return (
        <MainCard title="Danh sách đối tác">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SubCard title="Xem danh sách tài khoản đối tác" secondary={<SearchBoxAction onChange={handleFilter}/>}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                {/*table data*/}
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>STT</TableCell>
                                                <TableCell>Tên đăng nhập</TableCell>
                                                <TableCell>Quản trị viên</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>Tên công ty</TableCell>
                                                <TableCell>Trạng thái</TableCell>
                                                {/* Add more table header cells for other data fields */}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {tenants.map((tenant, i) => (
                                                <TableRow key={tenant.userId}>
                                                    <TableCell>{index + i + 1}</TableCell>
                                                    <TableCell>{tenant.username}</TableCell>
                                                    <TableCell>{tenant.fullName}</TableCell>
                                                    <TableCell>{tenant.email}</TableCell>
                                                    <TableCell>{tenant.companyName}</TableCell>
                                                    <TableCell>{tenant.active ? 'Hoạt động' : 'Ngừng hoạt động'}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default TenantLists;
