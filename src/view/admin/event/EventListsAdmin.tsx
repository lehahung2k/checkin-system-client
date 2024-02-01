import React, { useEffect, useState } from "react";
import MainCard from "../../../components/cards/MainCard";
import eventsApi from "../../../services/eventsApi";
import { Grid, IconButton } from "@mui/material";
import SubCard from "../../../components/cards/SubCard";
import dateTimeCalc from "../../../services/dateTimeCalc";
import SearchBoxAction from "../../../components/cards/SearchBoxAction";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconEye } from "@tabler/icons-react"
import {download, generateCsv, mkConfig} from "export-to-csv";

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
    const csvConfig = mkConfig({ useKeysAsHeaders: true });

    const getEvents = () => {
        eventsApi
            .getEventsByAdmin()
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
        { field: 'id', headerName: '#', minWidth: 50, flex: 0.01 },
        { field: 'eventName', headerName: 'Tên sự kiện', minWidth: 200, flex: 0.2, resizable: true},
        { field: 'startTime', headerName: 'Thời gian bắt đầu', minWidth: 150, flex: 0.1},
        { field: 'endTime', headerName: 'Thời gian kết thúc', minWidth: 150, flex: 0.1 },
        { field: 'eventCode', headerName: 'Mã sự kiện', minWidth: 150, flex: 0.1},
        { field: 'status', headerName: 'Trạng thái', minWidth: 150, flex: 0.1 },
        { field: 'viewDetails', headerName: 'Chi tiết', minWidth: 100, renderCell: (params) => (
            <IconButton
                onClick={() => handleViewDetails(params.row.eventId)}
                color="primary"
            >
                <IconEye />
            </IconButton>
        )}
    ];

    const data = events.map((event: EventData, index) => {
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

    console.log(data);

    const handleFilter = (e: any) => { }

    const handleViewDetails = (eventId: string) => {}

    const handleCsvDownload = () => {
        if (data) {
            const csv = generateCsv(csvConfig)(data);
            download({ ...csvConfig, filename: 'EventData' })(csv);
        } else {
            console.error('Data is undefined or null.');
        }
    };


    return (
        <MainCard title="Danh sách sự kiện:">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SubCard title="Xem danh sách toàn bộ sự kiện" secondary={<SearchBoxAction onChange={handleFilter} />}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                {/*<DataTable*/}
                                <DataGrid
                                    rows={data}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                    }}
                                    pageSizeOptions={[5, 10, 15]}
                                    checkboxSelection
                                    autoHeight={true}
                                />
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
            <IconButton onClick={handleCsvDownload} color="primary">
                Download CSV
            </IconButton>
        </MainCard>
    );
}

export default EventListsAdmin;
