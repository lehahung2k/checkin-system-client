import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Grid, TextField } from '@mui/material';
import MainCard from "../../../components/cards/MainCard";
import SubCard from "../../../components/cards/SubCard";
import MuiNotification from "../../../components/Notification";
import { IconUpload } from "@tabler/icons-react";
import eventsApi from "../../../services/eventsApi";
import { useNavigate } from "react-router";

interface CreateEventFormValues {
    eventCode: string;
    eventName: string;
    eventDescription: string;
    startTime: Date;
    endTime: Date;
    eventImg: string;
}
const CreateEvent = () => {
    const [formValues, setFormValues] = useState<CreateEventFormValues>({
        eventCode: "",
        eventName: "",
        eventDescription: "",
        startTime: new Date(),
        endTime: new Date(),
        eventImg: "",
    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState<Partial<CreateEventFormValues>>({});
    const navigate = useNavigate();
    const handleSnackbarClose = () => {
        setIsSnackbarOpen(false);
    };

    const formatDateTime = (dateTime: Date) => {
        const year = dateTime.getUTCFullYear();
        const month = String(dateTime.getUTCMonth() + 1).padStart(2, "0");
        const date = String(dateTime.getUTCDate()).padStart(2, "0");
        const hours = String(dateTime.getUTCHours()).padStart(2, "0");
        const minutes = String(dateTime.getUTCMinutes()).padStart(2, "0");

        return `${year}-${month}-${date}T${hours}:${minutes}`;
    };

    useEffect(() => {
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            startTime: new Date(),
            endTime: new Date(),
        }));
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [name]: value,
        }));
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            if (file.size > 1242880) { // 5MB (5242880 bytes)
                alert("Kích thước ảnh không được vượt quá 5MB");
                return;
            }
            setSelectedImage(file);
        }
    };

    const convertImageToBase64 = (imageFile: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(imageFile);
        });
    };

    const createEvent = async () => {
        const errors: Partial<CreateEventFormValues> = {};
        if (!formValues.eventCode) errors.eventCode = "Bấm nút để tạo mã sự kiện";
        if (!formValues.eventName) errors.eventName = "Tên sự kiện không được để trống";

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            // Call API here
            const eventData: CreateEventFormValues = {
                ...formValues,
            }
            if (selectedImage) {
                eventData.eventImg = await convertImageToBase64(selectedImage);
            }
            console.log(eventData);
            eventsApi
                .addNewEvent(eventData)
                .then((res) => {
                    setIsSnackbarOpen(true);
                    setSuccessMessage("Tạo sự kiện thành công");
                    setErrorMessage("");
                    console.log(res);
                    setTimeout(() => {
                        navigate("/"); // Redirect to the dashboard after a delay
                    }, 3000);
                })
                .catch((error) => {
                    setErrorMessage(error.response.data.message);
                    setIsSnackbarOpen(true);
                    setSuccessMessage("");
                    console.log(error.response.data.message);
                });
        }
    };

    return (
        <MainCard title="Tạo mới sự kiện">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SubCard title="Nhập thông tin của sự kiện">
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    name={"eventCode"}
                                    label="Mã sự kiện"
                                    value={formValues.eventCode}
                                    onChange={handleInputChange}
                                    fullWidth
                                    error={!!formErrors.eventCode}
                                    helperText={formErrors.eventCode}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Tên sự kiện"
                                    variant="outlined"
                                    name={"eventName"}
                                    value={formValues.eventName}
                                    fullWidth
                                    onChange={handleInputChange}
                                    error={!!formErrors.eventName}
                                    helperText={formErrors.eventName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Mô tả sự kiện"
                                    variant="outlined"
                                    name={"eventDescription"}
                                    value={formValues.eventDescription}
                                    multiline
                                    rows={4}
                                    fullWidth
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Thời gian bắt đầu"
                                    type="datetime-local"
                                    variant="outlined"
                                    fullWidth
                                    value={formatDateTime(formValues.startTime)}
                                    onChange={(e) =>
                                        setFormValues((prevFormValues) => ({
                                            ...prevFormValues,
                                            startTime: new Date(e.target.value),
                                        }))
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Thời gian kết thúc"
                                    type="datetime-local"
                                    variant="outlined"
                                    fullWidth
                                    value={formatDateTime(formValues.endTime)}
                                    onChange={(e) =>
                                        setFormValues((prevFormValues) => ({
                                            ...prevFormValues,
                                            endTime: new Date(e.target.value),
                                        }))
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <input
                                    accept="image/*"
                                    id="image-upload"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />
                                <label htmlFor="image-upload">
                                    <Button variant="outlined" component="span">
                                        <IconUpload /> Tải lên sơ đồ sự kiện
                                    </Button>
                                </label>
                                {selectedImage && (
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <img src={URL.createObjectURL(selectedImage)} alt="Ảnh review" style={{ width: '33vw', borderRadius: '14px' }} />
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" sx={{ backgroundColor: 'secondary.dark' }} onClick={createEvent}>
                        Tạo mới
                    </Button>
                </Grid>
            </Grid>
            <MuiNotification
                isOpen={isSnackbarOpen}
                successMessage={successMessage}
                errorMessage={errorMessage}
                onClose={handleSnackbarClose}
            />
        </MainCard>
    );
}

export default CreateEvent;
