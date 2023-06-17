import React, { useEffect } from 'react';
import { Grid, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import SubCard from "../../../components/cards/SubCard";
import eventsApi from '../../../services/eventsApi';
import SkeletonLoading from '../../../components/cards/SkeletonLoading';
import dateTimeCalc from '../../../services/dateTimeCalc';

class EventDetailProps {
    eventId: string | any | undefined;
}

const EventDetail: React.FC<EventDetailProps> = ({ eventId }) => {
    const [event, setEvent] = React.useState<any>(null);
    const [startTimeFormat, setStartTimeFormat] = React.useState<string>("");
    const [endTimeFormat, setEndTimeFormat] = React.useState<string>("");

    const getEventDetail = () => {
        // call api
        eventsApi
            .getEventById(eventId)
            .then((res) => {
                const eventData = res.data.payload;
                setEvent(eventData);
                const startTime = new Date(eventData.startTime);
                const endTime = new Date(eventData.endTime);
                setStartTimeFormat(dateTimeCalc.formatDateTime(startTime));
                setEndTimeFormat(dateTimeCalc.formatDateTime(endTime));
                console.log(eventData);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        if (eventId) {
            getEventDetail();
        }
    }, [eventId]);

    return (
        <SubCard title="Chi tiết sự kiện">
            {/* Hiển thị thông tin event ở đây: */}
            {event && eventId ? (
                <>
                    <Grid container spacing={3} sx={{ maxHeight: '80vh', overflow: 'auto' }}>
                        <Grid item xs={12} md={4}>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primaryTypographyProps={{ variant: 'subtitle1', gutterBottom: true }}>
                                            <b>Tên sự kiện:</b> {event.eventName}
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>
                                            <b>Mã sự kiện:</b> {event.eventCode}
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>
                                            <b>Mô tả sự kiện:</b> {event.eventDescription}
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primaryTypographyProps={{ variant: 'subtitle1', gutterBottom: true }}>
                                            <b>Thời gian bắt đầu</b> {startTimeFormat}
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primaryTypographyProps={{ variant: 'subtitle1', gutterBottom: true }}>
                                            <b>Thời gian kết thúc</b> {endTimeFormat}
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {/* Ảnh sự kiện */}
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>
                                            <b>Ảnh sơ đồ sự kiện</b>
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <img src={event.eventImg} alt="Ảnh sự kiện" style={{ width: '100%', borderRadius: '14px', border: '1px solid' }} />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            {/* Danh sách quầy check-in */}
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>
                                            <b>Danh sách quầy check-in</b>
                                        </ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </>
            ) : (
                <SkeletonLoading />
            )
            }
        </SubCard >
    );
}

export default EventDetail;
