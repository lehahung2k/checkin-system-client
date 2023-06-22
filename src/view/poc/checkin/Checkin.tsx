import MainCard from "../../../components/cards/MainCard";
import {Button, Grid, TextField} from "@mui/material";
import CameraCapture from "../../../components/devices/CameraCapture";
import {useRef, useState} from "react";
import BarcodeScanner from "../../../components/devices/BarcodeScanner";
import SubCard from "../../../components/cards/SubCard";

const Checkin = () => {
    const [scanner, setScanner] = useState<any>(null);
    const cameraRefs = [
        useRef(null),
        useRef(null)
    ];
    const handleScan = (data: string | null) => {
        console.log('Barcode or QR code detected:', data);

        // Xử lý mã vạch hoặc mã QR được quét ở đây (nếu cần)
        // ...
    };

    return (
        <MainCard title='Check-in'>
            <Grid container spacing={3}>
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
                                    sx={{backgroundColor : 'secondary.main'}}
                                >
                                    Check-in
                                </Button>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    )
}
export default Checkin;
