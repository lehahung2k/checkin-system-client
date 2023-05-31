import React from 'react';
import './Welcome.scss';
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import coverImg from '../../../assets/images/welcome/Welcome background 02.png'
import { Link } from 'react-router-dom';

const Welcome = () => {

    return (
        <div className={"welcome-page"}>
            <header className="welcome-header">
                <img src={coverImg} alt="" />
            </header>
            <Container className="welcome-body">
                <Grid>
                    {/* Your system description */}
                </Grid>
                <div className="buttons">
                    <Link to="/auth/login">
                        <Button variant="contained">Đăng nhập</Button>
                    </Link>
                    <Link to="/auth/register">
                        <Button variant="contained">Register</Button>
                    </Link>
                </div>
            </Container>
            {/* Authors and copyright */}
            <Box
                sx={{
                    width: "100%",
                    height: "auto",
                    backgroundColor: "primary.main",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                }}
            >
                <Container maxWidth="lg">
                    <Grid container direction="column" alignItems="center">
                        <Grid item xs={12}>
                            <Typography color="black" variant="h5">
                                Event Checkin Managemant
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1"
                                sx={{
                                    color: "white",
                                }}
                            >
                                {`© Copy right ${new Date().getFullYear()} Le Ha Hung | PhD Nguyen Duc Tien`}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    );
};

export default Welcome;
