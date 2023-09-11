import React, {useEffect, useState} from "react";
import {Box, Grid, IconButton, Modal} from "@mui/material";
import MainCard from "../../../components/cards/MainCard";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import SkeletonLoading from "../../../components/cards/SkeletonLoading";
import pocApi from "../../../services/pocApi";
import {IconEye} from "@tabler/icons-react";
import GuestsList from "./GuestsList";

interface PocData {
    pointId: string;
    pointCode: string;
    pointName: string;
    pointNote: string;
    eventCode: string;
}

const ViewGuests = () => {
    const [pocData, setPocData] = useState<PocData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPointCode, setSelectedPointCode] = React.useState<string>('');
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
                <IconButton color='primary' onClick={() => handleEventClick(params.row.pointCode)}>
                    <IconEye />
                </IconButton>
            )}
    ];

    const handleEventClick = (pointCode: string) => {
        setSelectedPointCode(pointCode);
        setIsModalOpen(true);
    };

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
        <MainCard title='Xem danh sách khách checkin'>
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

export default ViewGuests;
