import MainCard from "../../../components/cards/MainCard";
import { Grid, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import accountApi from "../../../services/accountApi";
import React, { useEffect, useState } from "react";
import SubCard from "../../../components/cards/SubCard";
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
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setCurrentPage(newPage);
    };
    
    const totalPages = Math.ceil(tenants.length / itemsPerPage);

    const getTenants = () => {
        accountApi
            .getTenantAccounts()
            .then((res) => {
                const tenants = res.data.payload;
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
                    <SubCard title="Xem danh sách tài khoản đối tác" secondary={<SearchBoxAction onChange={handleFilter} />}>
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
                                            {tenants.slice(indexOfFirstItem, indexOfLastItem).map((tenant, i) => (
                                                <TableRow key={tenant.userId}>
                                                    <TableCell>{indexOfFirstItem + i + 1}</TableCell>
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
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handleChangePage}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default TenantLists;
