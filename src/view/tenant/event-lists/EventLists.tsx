import MainCard from "../../../components/cards/MainCard";
import {Grid} from "@mui/material";
import React, {useEffect, useState} from "react";
import SubCard from "../../../components/cards/SubCard";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import eventsApi from "../../../services/eventsApi";

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

    const handleEventClick = (eventId: string) => {
        setSelectedEventId(eventId);
        // Show the modal or perform any other action
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

    const calculateEventStatus = (startTime: string, endTime: string): string => {
        const currentDate = new Date();
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);

        if (currentDate < startDate) {
            return 'Chưa bắt đầu';
        } else if (currentDate >= startDate && currentDate <= endDate) {
            return 'Đang diễn ra';
        } else {
            return 'Đã kết thúc';
        }
    };
    const rows = events.map((event: any, index) => {
        const startTime = new Date(event.startTime);
        const endTime = new Date(event.endTime);

        const formatDateTime = (dateTime: Date) => {
            const year = dateTime.getFullYear();
            const month = String(dateTime.getMonth() + 1).padStart(2, '0');
            const day = String(dateTime.getDate()).padStart(2, '0');
            const hours = String(dateTime.getHours()).padStart(2, '0');
            const minutes = String(dateTime.getMinutes()).padStart(2, '0');

            return `${day}/${month}/${year} ${hours}:${minutes}`;
        };
        return {
            id: index + 1,
            eventName: event.eventName,
            startTime: formatDateTime(startTime),
            endTime: formatDateTime(endTime),
            eventCode: event.eventCode,
            status: calculateEventStatus(event.startTime, event.endTime),
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
        </MainCard>
    );
}
export default EventLists;
