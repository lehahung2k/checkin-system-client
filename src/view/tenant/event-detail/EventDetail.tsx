import React from 'react';
import {Typography} from "@mui/material";
import SubCard from "../../../components/cards/SubCard";

class EventDetailProps {
    eventId: string | any;
}

const EventDetail: React.FC<EventDetailProps> = ({eventId}) => {
    return (
        <SubCard title="Chi tiết sự kiện:">
            <Typography variant="body2" component="div" gutterBottom>
                Hello {eventId}
            </Typography>
        </SubCard>
    );
}

export default EventDetail;
