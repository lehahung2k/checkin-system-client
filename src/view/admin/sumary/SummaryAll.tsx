import MainCard from "../../../components/cards/MainCard";
import {Typography} from "@mui/material";

const SummaryAll = () => {
    return (
        <MainCard title="Thống kê">
            <Typography variant="body2">Thống kê các sự kiện đã diễn ra, số lượng đối tác tham gia, số lượng POC, số lượng khách checkin</Typography>
        </MainCard>
    );
}

export default SummaryAll;
