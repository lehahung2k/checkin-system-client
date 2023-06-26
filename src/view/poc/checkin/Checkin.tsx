import MainCard from "../../../components/cards/MainCard";
import {
    Button,
    Grid,
    TextField,
} from "@mui/material";
import CameraCapture from "../../../components/devices/CameraCapture";
import React, {useEffect, useState} from "react";
import BarcodeScanner from "../../../components/devices/BarcodeScanner";
import SubCard from "../../../components/cards/SubCard";
import SearchInfoForm from "./SearchInfoForm";
import MuiNotification from "../../../components/Notification";

interface EventData {
    eventName: string;
}

interface PocData {
    pointName: string;
    pointNote: string;
    pointCode: string;
}

interface CheckinData {
    guestCode: string;
    guestDescription: string;
    frontImg: string;
    backImg: string;
    identityType: string;
    pointCode: string;
}

const Checkin = () => {
    const [event, setEvent] = useState<EventData>()
    const [poc, setPoc] = useState<PocData>()
    const [pointCode, setPointCode] = useState("");
    const [checkinData, setCheckinData] = useState<CheckinData>({
        guestCode: '',
        guestDescription: '',
        frontImg: '',
        backImg: '',
        identityType: '',
        pointCode: '',
    });
    {/* Thanh thông báo */}
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const handleSnackbarClose = () => {
        setIsSnackbarOpen(false);
    };
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleCaptureFrontImage = (imageData: string) => {
        setCheckinData((prevState) => ({
            ...prevState,
            frontImg: imageData,
        }));
    };
    const handleCaptureBackImage = (imageData: string) => {
        setCheckinData((prevState) => ({
            ...prevState,
            backImg: imageData,
        }));
    }

    useEffect(() => {
        setCheckinData((prevState) => ({
            ...prevState,
            pointCode: pointCode,
        }));
    }, [pointCode]);

    const handleCheckin = () => {
        setCheckinData({
            ...checkinData,
            pointCode: pointCode,
        });
        setIsSnackbarOpen(true);
        setSuccessMessage("");
        setErrorMessage("Lỗi! Vui lòng thử lại!");
        console.log(checkinData);
        setCheckinData({
            guestCode: '',
            guestDescription: '',
            frontImg: '',
            backImg: '',
            identityType: '',
            pointCode: pointCode,
        });
    }

    return (
        <MainCard title='Check-in'>
            <Grid container spacing={3}>
                <SearchInfoForm setEvent={setEvent} setPoc={setPoc} setPointCode={setPointCode}/>

                <Grid item xs={12} md={12} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }} />

                {event && (
                    <>
                        <Grid item xs={12} md={4}>
                            <CameraCapture onCaptureImage={handleCaptureFrontImage}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <CameraCapture onCaptureImage={handleCaptureBackImage}/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <SubCard title='Kết quả quét'>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            fullWidth
                                            name={'guestCode'}
                                            label='Mã định danh'
                                            value={checkinData.guestCode}
                                            onChange={(e) => setCheckinData((prevState) => ({ ...prevState, guestCode: e.target.value }))}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            fullWidth
                                            name={'guestNote'}
                                            label='Ghi chú'
                                            value={checkinData.guestDescription}
                                            onChange={(e) => setCheckinData((prevState) => ({ ...prevState, guestDescription: e.target.value }))}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            fullWidth
                                            name={'identityType'}
                                            label='Loại giấy tờ'
                                            value={checkinData.identityType}
                                            onChange={(e) => setCheckinData((prevState) => ({ ...prevState, identityType: e.target.value }))}
                                        />
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
                <MuiNotification
                    isOpen={isSnackbarOpen}
                    successMessage={successMessage}
                    errorMessage={errorMessage}
                    onClose={handleSnackbarClose}
                />
            </Grid>
        </MainCard>
    )
}
export default Checkin;
