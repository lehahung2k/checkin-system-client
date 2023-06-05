import React, { ChangeEvent, useEffect, useState } from "react";
import { Grid, Typography, TextField, Button } from '@mui/material';
import MainCard from "../../../components/cards/MainCard";

const CreateEvent = () => {

    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    useEffect(() => {
        setStartTime(new Date());
        setEndTime(new Date());
    }, []);

    const formatDateTime = (dateTime: { getFullYear: () => any; getMonth: () => number; getDate: () => any; getHours: () => any; getMinutes: () => any; }) => {
        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, "0");
        const date = String(dateTime.getDate()).padStart(2, "0");
        const hours = String(dateTime.getHours()).padStart(2, "0");
        const minutes = String(dateTime.getMinutes()).padStart(2, "0");

        return `${year}-${month}-${date}T${hours}:${minutes}`;
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedImage(file);
        }
    };

    const createEvent = () => {
        // Call API here
        console.log("Start time:", startTime);
        console.log("End time:", endTime);
        console.log("Selected image:", selectedImage);
    };

    return (
        <MainCard title="Tạo mới sự kiện">
            <Typography variant="body2">Nhập thông tin của sự kiện</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        label="Mã sự kiện"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Tên sự kiện"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Mô tả sự kiện"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Thời gian bắt đầu"
                        type="datetime-local"
                        variant="outlined"
                        fullWidth
                        value={formatDateTime(startTime)}
                        onChange={(e) => setStartTime(new Date(e.target.value))}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Thời gian kết thúc"
                        type="datetime-local"
                        variant="outlined"
                        fullWidth
                        value={formatDateTime(endTime)}
                        onChange={(e) => setEndTime(new Date(e.target.value))}
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
                            Chọn ảnh
                        </Button>
                    </label>
                    {selectedImage && (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={URL.createObjectURL(selectedImage)} alt="Ảnh review" style={{ width: '33vw', borderRadius: '14px' }} />
                        </div>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" sx={{backgroundColor: 'secondary.dark'}} onClick={createEvent}>
                        Tạo mới
                    </Button>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default CreateEvent;
