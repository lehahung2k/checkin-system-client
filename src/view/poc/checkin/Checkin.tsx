import MainCard from "../../../components/cards/MainCard";
import {
    Button,
    Grid,
    TextField,
} from "@mui/material";
import CameraCapture from "../../../components/devices/CameraCapture";
import React, {useRef, useState} from "react";
import BarcodeScanner from "../../../components/devices/BarcodeScanner";
import SubCard from "../../../components/cards/SubCard";
import SearchInfoForm from "./SearchInfoForm";

interface EventData {
    eventName: string,
}

interface PocData {
    pointName: string,
    pointNote: string,
    pointCode: string,
}

interface CheckinData {
    guestCode: string,
    guestNote: string,
    frontImg: string,
    backImg: string,
    pointCode: string,
}

const Checkin = () => {
    const [event, setEvent] = useState<EventData>()
    const [poc, setPoc] = useState<PocData>()
    const [checkinData, setCheckinData] = useState<CheckinData>({
        guestCode: '',
        guestNote: '',
        frontImg: '',
        backImg: '',
        pointCode: '',
    });

    const handleCheckin = () => {
        console.log(checkinData)
    }

    return (
        <MainCard title='Check-in'>
            <Grid container spacing={3}>
                <SearchInfoForm setEvent={setEvent} setPoc={setPoc}/>

                <Grid item xs={12} md={12} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }} />

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
                                            onClick={handleCheckin}
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
