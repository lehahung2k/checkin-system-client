import MainCard from "../../../components/cards/MainCard";
import {
    Grid,
    TextField,
    Button,
    Modal,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemText, Typography, Tooltip, Box
} from "@mui/material";
import React, {SetStateAction, useEffect, useState} from "react";
import eventsApi from "../../../services/eventsApi";
import SubCard from "../../../components/cards/SubCard";
import {FileCopy} from "@mui/icons-material";
import CreatePocForm from "./CreatePocForm";
import dateTimeCalc from "../../../services/dateTimeCalc";

interface EventData {
    eventId: string;
    eventCode: string;
    eventName: string;
    eventDescription: string;
    startTime: string;
    endTime: string;
    eventImg: string;
}
const CreatePoc = () => {
    const [eventCode, setEventCode] = useState("");
    const [eventInfo, setEventInfo] = useState<EventData>();
    const [startTimeFormat, setStartTimeFormat] = React.useState<string>("");
    const [endTimeFormat, setEndTimeFormat] = React.useState<string>("");
    const [openModal, setOpenModal] = useState(false);

    const getEventInfo = () => {
        eventsApi
            .getEventByEventCode(eventCode)
            .then((res) => {
                const eventData = res.data.payload;
                setEventInfo(eventData);
                const startTime = new Date(eventData.startTime);
                const endTime = new Date(eventData.endTime);
                setStartTimeFormat(dateTimeCalc.formatDateTime(startTime));
                setEndTimeFormat(dateTimeCalc.formatDateTime(endTime));
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    };

    const handleJoinButtonClick = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const copyToClipboard = (text : string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <MainCard title="Tạo mới gian hàng">
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    {/* Input: nhập vào mã sự kiện */}
                    <TextField
                        label="Mã sự kiện"
                        variant="outlined"
                        value={eventCode}
                        onChange={(e) => setEventCode(e.target.value)}
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button onClick={getEventInfo} variant="outlined">
                                        Kiểm tra
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    {eventInfo && (
                        <SubCard title={'Thông tin sự kiện'}>
                            <Grid container spacing={3} sx={{ maxHeight: '80vh', overflow: 'auto' }}>
                                <Grid item xs={12} md={4}>
                                    <List>
                                        <ListItem disablePadding>
                                            <ListItemButton onClick={() => copyToClipboard(eventInfo.eventName)}>
                                                <ListItemText primaryTypographyProps={{ variant: 'subtitle1', gutterBottom: true }}>
                                                    <b>Tên sự kiện:</b> {eventInfo.eventName}
                                                </ListItemText>
                                                <Typography variant="body2" color="textSecondary">
                                                    <Tooltip title={'Copy'}>
                                                        <FileCopy/>
                                                    </Tooltip>
                                                </Typography>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton onClick={() => copyToClipboard(eventInfo.eventCode)}>
                                                <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>
                                                    <b>Mã sự kiện:</b> {eventInfo.eventCode}
                                                </ListItemText>
                                                <Typography variant="body2" color="textSecondary">
                                                    <Tooltip title={'Copy'}>
                                                        <FileCopy/>
                                                    </Tooltip>
                                                </Typography>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }}>
                                                    <b>Mô tả sự kiện:</b> {eventInfo.eventDescription}
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
                                            <img
                                                src={eventInfo.eventImg}
                                                alt="Ảnh sự kiện"
                                                style={{ width: '100%', borderRadius: '14px', border: '1px solid #b39ddb' }}
                                            />
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>

                            <Button
                                onClick={handleJoinButtonClick}
                                variant="contained"
                                color="primary"
                                sx={{backgroundColor: 'secondary.dark'}}
                            >
                                Tham gia
                            </Button>
                        </SubCard>
                    )}
                </Grid>
                <Modal keepMounted open={openModal} onClose={() => setOpenModal(false)}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        boxShadow: 10,
                        maxHeight: '80vh', // Giới hạn chiều cao tối đa
                    }}>
                        <CreatePocForm eventCode={eventCode}/>
                    </Box>
                </Modal>
            </Grid>
        </MainCard>
    );
};

export default CreatePoc;
