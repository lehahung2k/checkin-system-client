import MainCard from "../../../components/cards/MainCard";
import {Box, Grid, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React, {useEffect, useState} from "react";
import SubCard from "../../../components/cards/SubCard";
import eventsApi from "../../../services/eventsApi";
import EventDetail from "../event-detail/EventDetail";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import dateTimeCalc from "../../../services/dateTimeCalc";

const columns: GridColDef[] = [
    {field: 'id', headerName: 'STT', flex: 0.02},
    {
        field: 'eventName',
        headerName: 'Tên sự kiện',
        flex: 0.2,
    },
    {field: 'startTime', headerName: 'Thời gian bắt đầu', flex: 0.1},
    {field: 'endTime', headerName: 'Thời gian kết thúc', flex: 0.1},
    {field: 'eventCode', headerName: 'Mã sự kiện', flex: 0.1},
    {field: 'status', headerName: 'Trạng thái', flex: 0.1},
];

const EventLists = () => {
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = React.useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEventClick = (eventId: string) => {
        setSelectedEventId(eventId);
        setIsModalOpen(true);
    };

    const getEvents = () => {
        eventsApi
            .getAllEvents()
            .then((res) => {
                const events = res.data.payload;
                setEvents(events);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }

    useEffect(() => {
        getEvents();
    }, []);

    const rows = events.map((event: any, index) => {
        const startTime = new Date(event.startTime);
        const endTime = new Date(event.endTime);
        return {
            id: index + 1,
            eventName: event.eventName,
            startTime: dateTimeCalc.formatDateTime(startTime),
            endTime: dateTimeCalc.formatDateTime(endTime),
            eventCode: event.eventCode,
            status: dateTimeCalc.calculateEventStatus(event.startTime, event.endTime),
        }
    });
    return (
        <MainCard title="Danh sách sự kiện">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SubCard title="Xem danh sách sự kiện">
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {page: 0, pageSize: 5},
                                        },
                                    }}
                                    pageSizeOptions={[5, 10]}
                                    checkboxSelection
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
            <Modal keepMounted open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: '25%',
                    left: '55%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    boxShadow: 10,
                }}>
                    <EventDetail eventId={selectedEventId} />
                </Box>
            </Modal>
        </MainCard>
    );
}
export default EventLists;
