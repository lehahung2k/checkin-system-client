import MainCard from "../../../components/cards/MainCard";
import {
    Button,
    Grid,
    InputAdornment,
    ListItemButton,
    ListItemText,
    TextField,
} from "@mui/material";
import CameraCapture from "../../../components/devices/CameraCapture";
import React, {useRef, useState} from "react";
import BarcodeScanner from "../../../components/devices/BarcodeScanner";
import SubCard from "../../../components/cards/SubCard";
import eventsApi from "../../../services/eventsApi";
import pocApi from "../../../services/pocApi";

interface EventData {
    eventName: string,
}

interface PocData {
    pointName: string,
    pointNote: string,
}

const Checkin = () => {
    const [pointCode, setPointCode] = useState("");
    const [event, setEvent] = useState<EventData>()
    const [poc, setPoc] = useState<PocData>()
    const getDataByPointCode = () => {
        eventsApi
            .getEventByPointCode(pointCode)
            .then((res) => {
                const eventData = res.data.payload;
                setEvent(eventData);
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
        pocApi
            .getPocByPointCode(pointCode)
            .then((res) => {
                const pocData = res.data.payload;
                setPoc(pocData);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }

    return (
        <MainCard title='Check-in'>
            <Grid container spacing={3}>
                {/* Thông tin quầy check-in */}
                <Grid item xs={12} md={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Mã quầy check-in"
                                variant="outlined"
                                value={pointCode}
                                onChange={(e) => setPointCode(e.target.value)}
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button onClick={getDataByPointCode} variant="outlined">
                                                Kiểm tra
                                            </Button>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            {event && (
                                <ListItemButton>
                                    <ListItemText primaryTypographyProps={{
                                        variant: 'subtitle1',
                                        gutterBottom: true,
                                    }}>
                                        <b>Sự kiện:</b> {event.eventName}
                                    </ListItemText>
                                </ListItemButton>
                            )}
                        </Grid>
                        {poc && (
                            <>
                                <Grid item xs={12} md={3}>
                                    <ListItemButton>
                                        <ListItemText primaryTypographyProps={{
                                            variant: 'subtitle1',
                                            gutterBottom: true,
                                        }}>
                                            <b>Tên quầy:</b> {poc.pointName}
                                        </ListItemText>
                                    </ListItemButton>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <ListItemButton>
                                        <ListItemText primaryTypographyProps={{
                                            variant: 'subtitle1',
                                        }}>
                                            <b>Ghi chú:</b> {poc.pointNote}
                                        </ListItemText>
                                    </ListItemButton>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }} />
                {/* Chụp ảnh */}
                {event && (
                    <>
                        <Grid item xs={12} md={4}>
                            <CameraCapture/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <CameraCapture/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <SubCard title='Kết quả quét'>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={12}>
                                        <BarcodeScanner/>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <TextField fullWidth name={'guestCode'} label='Mã định danh'/>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <TextField fullWidth name={'guestNote'} label='Ghi chú'/>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{backgroundColor: 'secondary.main'}}
                                        >
                                            Check-in
                                        </Button>
                                    </Grid>
                                </Grid>
                            </SubCard>
                        </Grid>
                    </>
                )}
            </Grid>
        </MainCard>
    )
}
export default Checkin;
