import MainCard from "../../../components/cards/MainCard";
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import CameraCapture from "../../../components/devices/CameraCapture";
import React, {useEffect, useRef, useState} from "react";
import SubCard from "../../../components/cards/SubCard";
import SearchInfoForm from "./SearchInfoForm";
import MuiNotification from "../../../components/Notification";
import guestApi from "../../../services/guestApi";

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
    // Thanh thông báo
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSnackbarClose = () => {
        setIsSnackbarOpen(false);
    };
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorFields, setErrorFields] = useState<{ [key: string]: boolean }>({
        guestCode: false,
    });
    const validateFields = () => {
        const updatedErrorFields = { ...errorFields }; // Sao chép trạng thái lỗi hiện tại

        // Kiểm tra từng trường dữ liệu
        if (checkinData.guestCode.trim() === "") {
            updatedErrorFields.guestCode = true; // Trường dữ liệu bị bỏ trống
        } else {
            updatedErrorFields.guestCode = false; // Trường dữ liệu không bị bỏ trống
        }

        setErrorFields(updatedErrorFields);
        return !Object.values(updatedErrorFields).some((error) => error);
    };

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
        const isValid = validateFields();
        if (isValid) {
            setCheckinData({
                ...checkinData,
                pointCode: pointCode,
            });
            console.log(checkinData);
            setIsLoading(true);
            setIsSnackbarOpen(true);
            guestApi
                .checkinGuest(checkinData)
                .then((res) => {
                    setSuccessMessage("Check-in thành công!");
                    setIsLoading(false);
                    setCheckinData({
                        ...checkinData,
                        guestCode: '',
                        guestDescription: '',
                        frontImg: '',
                        backImg: '',
                        pointCode: pointCode,
                    });
                })
                .catch((err) => {
                    setErrorMessage(err.response.data.message);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }

    const handleCaptureImage = () => {
        console.log("test")
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCheckin();
            if (checkinData.frontImg === '' && checkinData.backImg === '') {
                handleCaptureImage();
            }
        }
    };

    return (
        <MainCard title='Check-in'>
            <Grid container spacing={3}>
                <SearchInfoForm setEvent={setEvent} setPoc={setPoc} setPointCode={setPointCode} />

                <Grid item xs={12} md={12} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }} />

                {event && (
                    <>
                        <Grid item xs={12} md={4}>
                            <CameraCapture onCaptureImage={handleCaptureFrontImage} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <CameraCapture onCaptureImage={handleCaptureBackImage} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {/* Lấy kết quả quét và tự động điền vào các textfield: */}
                            <SubCard title='Kết quả quét'>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="identityType">Loại giấy tờ</InputLabel>
                                            <Select
                                                labelId="identityType"
                                                fullWidth
                                                name="identityType"
                                                value={checkinData.identityType}
                                                label="Loại giấy tờ"
                                                onChange={(e) =>
                                                    setCheckinData((prevState) => ({
                                                        ...prevState,
                                                        identityType: e.target.value,
                                                    }))
                                                }
                                            >
                                                <MenuItem value="event_card">Thẻ sự kiện</MenuItem>
                                                <MenuItem value="citizen_identity_card">Căn cước công dân</MenuItem>
                                                <MenuItem value="student_card">Thẻ sinh viên</MenuItem>
                                                <MenuItem value="others">Khác</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            fullWidth
                                            autoFocus
                                            name={'guestCode'}
                                            label='Mã định danh'
                                            value={checkinData.guestCode}
                                            error={errorFields.guestCode}
                                            helperText={
                                                errorFields.guestCode ? "Mã định danh không được bỏ trống" : ""
                                            }
                                            onChange={(e) => setCheckinData((prevState) => ({ ...prevState, guestCode: e.target.value }))}
                                            onKeyDown={handleKeyDown}
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
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            id='checkin'
                                            sx={{ backgroundColor: 'secondary.main' }}
                                            onClick={handleCheckin}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Checking..." : "Check-in"}
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
