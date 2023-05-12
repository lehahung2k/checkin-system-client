// material-ui
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import React from 'react';

// types
type LoaderProps = {
    message?: string;
};

// styles
const LoaderWrapper = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1301,
    width: '100%'
});

// ==============================|| LOADER ||============================== //
const Loader: React.FC<LoaderProps> = ({ message }) => (
    <LoaderWrapper>
        <LinearProgress color="primary" />
        {message && <div>{message}</div>}
    </LoaderWrapper>
);

export default Loader;