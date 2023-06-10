import React from "react";
import {Skeleton, Stack} from "@mui/material";

const SkeletonLoading = () => {
    return (
        <Stack spacing={1}>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="rectangular" />
            <Skeleton variant="rounded" />
        </Stack>
    );
}

export default SkeletonLoading;
