import React, { useEffect, useState } from 'react';
import MainCard from '../../../components/cards/MainCard';
import {Box, Grid, IconButton, Modal} from '@mui/material';
import SearchBoxAction from '../../../components/cards/SearchBoxAction';
import SubCard from '../../../components/cards/SubCard';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconEye } from '@tabler/icons-react';
import pocApi from '../../../services/pocApi';
import GuestsList from "../../poc/view-guests/GuestsList";

interface PocData {
    pointId: string;
    pointCode: string;
    pointName: string;
    pointNote: string;
    enabled: boolean;
}

const ManagePoc = () => {
    const [pocs, setPocs] = useState<PocData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPointCode, setSelectedPointCode] = React.useState<string>('');

    const getPoc = () => {
        pocApi
            .getAllPocByTenant()
            .then((res) => {
                const pocs = res.data.payload;
                setPocs(pocs);
                console.log(pocs);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }

    useEffect(() => {
        getPoc();
    }, []);

    const handleEventClick = (pointCode: string) => {
        setSelectedPointCode(pointCode);
        setIsModalOpen(true);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: '#', minWidth: 50, flex: 0.02 },
        { field: 'pointName', headerName: 'Tên gian hàng', minWidth: 200, flex: 0.2 },
        { field: 'pointCode', headerName: 'Mã gian hàng', minWidth: 150, flex: 0.1 },
        { field: 'status', headerName: 'Trạng thái', minWidth: 150, flex: 0.1 },
        {
            field: 'viewDetails', headerName: 'Chi tiết', minWidth: 100, renderCell: (params) => (
                <IconButton color='primary' onClick={() => handleEventClick(params.row.pointCode)}>
                    <IconEye />
                </IconButton>
            )
        }
    ];

    const rows = pocs.map((pocs: any, index: number) => {
        return {
            id: index + 1,
            pointId: pocs.pointId,
            pointName: pocs.pointName,
            pointCode: pocs.pointCode,
            status: pocs.enabled ? 'Đang hoạt động' : 'Ngừng hoạt động',
        }
    });

    return (
        <MainCard title="Quản lý danh sách quầy check-in">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SubCard title="Xem danh sách quầy check-in của bạn" secondary={<SearchBoxAction onChange={() => { }} />}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <DataGrid
                                    columns={columns}
                                    rows={rows}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    pageSizeOptions={[5, 10, 20]}
                                    autoHeight={true}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
            <Modal keepMounted open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: '45%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    boxShadow: 10,
                    maxHeight: '80vh',
                }}>
                    <GuestsList pointCode={selectedPointCode}/>
                </Box>
            </Modal>
        </MainCard>
    );
}

export default ManagePoc;
