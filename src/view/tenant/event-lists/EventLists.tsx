import MainCard from "../../../components/cards/MainCard";
import {Box, Button, Grid, Modal} from "@mui/material";
import React, {useEffect, useState} from "react";
import SubCard from "../../../components/cards/SubCard";
import eventsApi from "../../../services/eventsApi";
import EventDetail from "../event-detail/EventDetail";
import dateTimeCalc from "../../../services/dateTimeCalc";
import SearchBoxAction from "../../../components/cards/SearchBoxAction";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconEye } from "@tabler/icons-react";
import {useNavigate} from "react-router";

interface EventData {
    eventId: string;
    eventCode: string;
    eventName: string;
    eventDescription: string;
    startTime: string;
    endTime: string;
}

const EventLists = () => {
    const [events, setEvents] = useState<EventData[]>([]);
    const [selectedEventId, setSelectedEventId] = React.useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

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

    const columns: GridColDef[] = [
        { field: 'id', headerName: '#', minWidth: 50, flex: 0.02 },
        { field: 'eventName', headerName: 'Tên sự kiện', minWidth: 200, flex: 0.2, resizable: true},
        { field: 'startTime', headerName: 'Thời gian bắt đầu', minWidth: 150, flex: 0.1},
        { field: 'endTime', headerName: 'Thời gian kết thúc', minWidth: 150, flex: 0.1 },
        { field: 'eventCode', headerName: 'Mã sự kiện', minWidth: 150, flex: 0.1},
        { field: 'status', headerName: 'Trạng thái', minWidth: 150, flex: 0.1 },
        { field: 'viewDetails', headerName: 'Chi tiết', minWidth: 100, renderCell: (params) => (
            <Button
                onClick={() => handleEventClick(params.row.eventId)}
                endIcon={<IconEye />}
            >
            </Button>
        )}
    ];

    const rows = events.map((event: any, index) => {
        const startTime = new Date(event.startTime);
        const endTime = new Date(event.endTime);
        return {
            id: index + 1,
            eventId: event.eventId,
            eventName: event.eventName,
            startTime: dateTimeCalc.formatDateTime(startTime),
            endTime: dateTimeCalc.formatDateTime(endTime),
            eventCode: event.eventCode,
            status: dateTimeCalc.calculateEventStatus(event.startTime, event.endTime),
        }
    });
    const [filteredRows, setFilteredRows] = useState(rows);
    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredData = rows.filter((row) =>
            Object.values(row)
                .join(" ")
                .toLowerCase()
                .includes(searchTerm)
        );
        setFilteredRows(filteredData);
    };

    return (
        <MainCard title="Danh sách sự kiện">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SubCard title="Xem danh sách sự kiện" secondary={<SearchBoxAction onChange={handleFilter}/>}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Grid container justifyContent="flex-end" marginBottom={2}>
                                    <Button variant="contained" sx={{backgroundColor: 'secondary.dark'}}
                                            onClick={()=>{
                                               navigate('/event/create');
                                            }}
                                    >
                                        Thêm mới
                                    </Button>
                                </Grid>
                                <DataGrid
                                    columns={columns}
                                    rows={rows}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    pageSizeOptions={[5, 10, 15]}
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
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    boxShadow: 10,
                    maxHeight: '80vh', // Giới hạn chiều cao tối đa
                }}>
                    <EventDetail eventId={selectedEventId} />
                </Box>
            </Modal>
        </MainCard>
    );
}
export default EventLists;
