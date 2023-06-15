import MainCard from "../../../components/cards/MainCard";
import {Box, Grid, Modal} from "@mui/material";
import React, {useEffect, useState} from "react";
import SubCard from "../../../components/cards/SubCard";
import eventsApi from "../../../services/eventsApi";
import EventDetail from "../event-detail/EventDetail";
import dateTimeCalc from "../../../services/dateTimeCalc";
import DataTable from "react-data-table-component";
import SearchBoxAction from "../../../components/cards/SearchBoxAction";

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
    const [data, setData] = useState([]);
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
                                <DataTable
                                    columns={columns}
                                    data={rows}
                                    pagination={true}
                                    pointerOnHover={true}
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
