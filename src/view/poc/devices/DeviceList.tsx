import MainCard from "../../../components/cards/MainCard";
import {Grid} from "@mui/material";

const DeviceList = () => {
    return (
        <MainCard title='Danh sách thiết bị'>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <p> Tính năng này hiện vẫn còn đang được phát triển. Vui lòng quay lại sau! </p>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default DeviceList;
