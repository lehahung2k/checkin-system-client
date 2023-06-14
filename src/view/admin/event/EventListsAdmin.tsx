import React, {useEffect, useState} from "react";
import MainCard from "../../../components/cards/MainCard";
import eventsApi from "../../../services/eventsApi";
import {Grid} from "@mui/material";
import SubCard from "../../../components/cards/SubCard";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import dateTimeCalc from "../../../services/dateTimeCalc";
const EventListsAdmin = () => {
    const [events, setEvents] = useState([]);
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'STT'},
        {
            field: 'eventName',
            headerName: 'Tên sự kiện',
        },
        {field: 'startTime', headerName: 'Thời gian bắt đầu'},
        {field: 'endTime', headerName: 'Thời gian kết thúc'},
        {field: 'eventCode', headerName: 'Mã sự kiện'},
        {field: 'status', headerName: 'Trạng thái'},
    ];

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
    const getEvents = () => {
        eventsApi
            .getEventsByAdmin()
            .then((res) => {
                const events = res.data.payload;
                console.log(events);
                setEvents(events);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <MainCard title="Danh sách sự kiện:">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SubCard title="Xem danh sách toàn bộ sự kiện">
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

export default EventListsAdmin;
