import {Box, Card, CardContent, CardMedia, Grid, Typography, useMediaQuery} from "@mui/material";
import React from "react";

const Welcome = () => {
    const matches = useMediaQuery("(min-width:800px)");
    return (
        <>
            Hello, Welcome!
        </>
    );
}

export default Welcome;