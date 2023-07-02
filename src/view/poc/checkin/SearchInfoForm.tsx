import React, { useState } from "react";
import eventsApi from "../../../services/eventsApi";
import pocApi from "../../../services/pocApi";
import { Button, Grid, InputAdornment, ListItemButton, ListItemText, TextField } from "@mui/material";

interface EventData {
    eventName: string;
}

interface PocData {
    pointName: string;
    pointNote: string;
    pointCode: string;
}

interface SearchInfoFormProps {
    setEvent: React.Dispatch<React.SetStateAction<EventData | undefined>>;
    setPoc: React.Dispatch<React.SetStateAction<PocData | undefined>>;
    setPointCode: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInfoForm: React.FC<SearchInfoFormProps> = ({ setEvent, setPoc, setPointCode }) => {
    const [pointCode, setLocalPointCode] = useState("");
    const [event, setEventLocal] = useState<EventData>();
    const [poc, setPocLocal] = useState<PocData>();

    const getDataByPointCode = async () => {
        eventsApi
            .getEventByPointCode(pointCode)
            .then((res) => {
                const eventData = res.data.payload;
                setEvent(eventData);
                setEventLocal(eventData);
            })
            .catch((err) => {
                if (err.response === undefined) alert("Lỗi kết nối đến máy chủ");
                alert(err.response.data.message);
            });

        pocApi
            .getPocByPointCode(pointCode)
            .then((res) => {
                const pocData = res.data.payload;
                setPoc(pocData);
                setPocLocal(pocData);
                setPointCode(pocData.pointCode);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };

    return (
        <Grid item xs={12} md={12}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <TextField
                        label="Mã quầy check-in"
                        variant="outlined"
                        value={pointCode}
                        onChange={(e) => setLocalPointCode(e.target.value)}
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
                            <ListItemText
                                primaryTypographyProps={{
                                    variant: "subtitle1",
                                    gutterBottom: true,
                                }}
                            >
                                <b>Sự kiện:</b> {event.eventName}
                            </ListItemText>
                        </ListItemButton>
                    )}
                </Grid>
                {poc && (
                    <>
                        <Grid item xs={12} md={3}>
                            <ListItemButton>
                                <ListItemText
                                    primaryTypographyProps={{
                                        variant: "subtitle1",
                                        gutterBottom: true,
                                    }}
                                >
                                    <b>Tên quầy:</b> {poc.pointName}
                                </ListItemText>
                            </ListItemButton>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <ListItemButton>
                                <ListItemText primaryTypographyProps={{ variant: "subtitle1" }}>
                                    <b>Ghi chú:</b> {poc.pointNote}
                                </ListItemText>
                            </ListItemButton>
                        </Grid>
                    </>
                )}
            </Grid>
        </Grid>
    );
};

export default SearchInfoForm;
