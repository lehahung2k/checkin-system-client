import React, {useEffect} from 'react';
import MainCard from "../../../components/cards/MainCard";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText
} from "@mui/material";
import SubCard from "../../../components/cards/SubCard";
import eventsApi from "../../../services/eventsApi";
import SkeletonLoading from "../../../components/cards/SkeletonLoading";
import dateTimeCalc from "../../../services/dateTimeCalc";
import guestApi from "../../../services/guestApi";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import SearchBoxAction from "../../../components/cards/SearchBoxAction";

interface PointCodeProps {
    pointCode: string;
}

interface GuestsData {
    guestCode: string;
    guestDescription: string;
    frontImg: string;
    backImg: string;
    identityType: string;
}

const GuestsList: React.FC<PointCodeProps> = ({pointCode}) => {
    const [guestsList, setGuestsList] = React.useState<GuestsData[]>([]);
    const [eventDetails, setEventDetails] = React.useState<any>({});
    const [startTimeFormat, setStartTimeFormat] = React.useState<string>("");
    const [endTimeFormat, setEndTimeFormat] = React.useState<string>("");
    const [rows, setRows] = React.useState<GuestsData[]>([]);
    const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

    const getEventByPointCode = () => {
        eventsApi
            .getEventByPointCode(pointCode)
            .then((res) => {
                const eventData = res.data.payload;
                setEventDetails(eventData);
                const startTime = new Date(eventData.startTime);
                const endTime = new Date(eventData.endTime);
                setStartTimeFormat(dateTimeCalc.formatDateTime(startTime));
                setEndTimeFormat(dateTimeCalc.formatDateTime(endTime));
            })
            .catch((err) => {
                console.log("Error retrieving event details: ", err.response.data.message);
            })
    }

    useEffect(() => {
        if (pointCode) getEventByPointCode();
    }, [pointCode]);

    const getGuestList = () => {
        guestApi
            .listGuest(pointCode)
            .then((res) => {
                const guestData = res.data.payload;
                setGuestsList(guestData);
            })
            .catch((err) => {
                console.log("Error retrieving guest list: ", err.response.data.message);
            });
    }

    useEffect(() => {
        if (pointCode) getGuestList();
    }, [pointCode]);

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const handleCloseImage = () => {
        setSelectedImage(null);
    };

    const renderCellImg = (params: any) => {
        const imageUrl = params.value;
        return(
            <>
                <Button onClick={() => handleImageClick(imageUrl)}>Xem ảnh</Button>
                <Dialog open={selectedImage === imageUrl} onClose={handleCloseImage}>
                    <DialogContent>
                        <img src={imageUrl} alt="Ảnh" style={{ width: '100%', height: 'auto' }} />
                    </DialogContent>
                </Dialog>
            </>
        );
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: '#', minWidth: 50, flex: 0.02},
        {field: 'guestCode', headerName: 'Mã định danh', minWidth: 200, flex: 0.15},
        {field: 'guestDescription', headerName: 'Ghi chú', minWidth: 200, flex: 0.15},
        {
            field: 'frontImg',
            headerName: 'Ảnh 1',
            minWidth: 200,
            flex: 0.1,
            renderCell: renderCellImg
        },
        {field: 'backImg', headerName: 'Ảnh 2', minWidth: 200, flex: 0.1, renderCell: renderCellImg},
        {field: 'identityType', headerName: 'Loại giấy tờ', minWidth: 200, flex: 0.1},
    ];

    console.log(guestsList);

    useEffect(() => {
        // Cập nhật rows khi guestsList thay đổi
        setRows(
            guestsList.map((guest, index) => ({
                id: index + 1,
                guestCode: guest.guestCode,
                guestDescription: guest.guestDescription,
                frontImg: guest.frontImg,
                backImg: guest.backImg,
                identityType: guest.identityType,
            }))
        );
    }, [guestsList]);

    return (
        <MainCard title="Danh sách khách tham dự">
            {/* Hiển thị danh sách khách tham dự ở đây */}
            <Grid container spacing={3} sx={{maxHeight: '80vh', overflow: 'auto'}}>
                <Grid item xs={12} md={12}>
                    <SubCard title="Chi tiết sự kiện">
                        {eventDetails && pointCode ?
                            (
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={4}>
                                        <List>
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemText primaryTypographyProps={{
                                                        variant: 'subtitle1',
                                                        gutterBottom: true
                                                    }}>
                                                        <b>{`Tên sự kiện: `}</b> {eventDetails.eventName}
                                                    </ListItemText>
                                                </ListItemButton>
                                            </ListItem>
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemText primaryTypographyProps={{variant: 'subtitle1'}}>
                                                        <b>{`Mã sự kiện: `}</b> {eventDetails.eventCode}
                                                    </ListItemText>
                                                </ListItemButton>
                                            </ListItem>
                                        </List>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <List>
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemText primaryTypographyProps={{
                                                        variant: 'subtitle1',
                                                        gutterBottom: true
                                                    }}>
                                                        <b>{`Thời gian bắt đầu: `}</b> {startTimeFormat}
                                                    </ListItemText>
                                                </ListItemButton>
                                            </ListItem>
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemText primaryTypographyProps={{
                                                        variant: 'subtitle1',
                                                        gutterBottom: true
                                                    }}>
                                                        <b>{`Thời gian kết thúc: `}</b> {endTimeFormat}
                                                    </ListItemText>
                                                </ListItemButton>
                                            </ListItem>
                                        </List>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <List>
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemText primaryTypographyProps={{
                                                        variant: 'subtitle1',
                                                        gutterBottom: true
                                                    }}>
                                                        <b>{`Trạng thái: `}</b> NANA
                                                    </ListItemText>
                                                </ListItemButton>
                                            </ListItem>
                                        </List>
                                    </Grid>
                                </Grid>
                            ) : (
                                <SkeletonLoading/>
                            )
                        }
                    </SubCard>
                </Grid>
                <Grid item xs={12} md={12}>
                    <SubCard title="Danh sách khách tham dự" secondary={<SearchBoxAction onChange={() => {}}/>}>
                        {guestsList && pointCode ? (
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={12}>
                                    <DataGrid
                                        columns={columns}
                                        rows={rows}
                                        initialState={{
                                            pagination: {
                                                paginationModel: {page: 0, pageSize: 5},
                                            },
                                        }}
                                        pageSizeOptions={[5, 10, 15]}
                                        autoHeight
                                    />
                                </Grid>
                            </Grid>
                        ) : (
                            <SkeletonLoading/>
                        )}
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default GuestsList;
