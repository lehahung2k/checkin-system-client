import React, {useEffect, useState} from "react";
import MainCard from "../../../components/cards/MainCard";
import eventsApi from "../../../services/eventsApi";
import {Grid} from "@mui/material";
import SubCard from "../../../components/cards/SubCard";
import dateTimeCalc from "../../../services/dateTimeCalc";
import SearchBoxAction from "../../../components/cards/SearchBoxAction";
import DataTable from 'react-data-table-component';

interface EventData {
    eventId: string;
    eventCode: string;
    eventName: string;
    eventDescription: string;
    startTime: string;
    endTime: string;
}

const EventListsAdmin = () => {
    const [events, setEvents] = useState<EventData[]>([]);
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

    const columns = [
        {
            name: '#',
            selector: (row: { id: number; }) => row.id,
            sortable: true,
        },
        {
            name: 'Tên sự kiện',
            selector: (row: { eventName: string; }) => row.eventName,
            sortable: true,
        },
        {
            name: 'Thời gian bắt đầu',
            selector: (row: { startTime: string; }) => row.startTime,
            sortable: true,
        },
        {
            name: 'Thời gian kết thúc',
            selector: (row: { endTime: string; }) => row.endTime,
            sortable: true,
        },
        {
            name: 'Mã sự kiện',
            selector: (row: { eventCode: string; }) => row.eventCode,
            sortable: true,
        },
        {
            name: 'Trạng thái',
            selector: (row: { status: string; }) => row.status,
            sortable: true,
        },
    ];

    const data = events.map((event: any, index) => {
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

    const handleFilter = (e: any) => {}

    return (
        <MainCard title="Danh sách sự kiện:">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SubCard title="Xem danh sách toàn bộ sự kiện" secondary={<SearchBoxAction onChange={handleFilter}/>}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    pointerOnHover={true}
                                    pagination={true}
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
