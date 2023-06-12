import React from 'react';
import './Welcome.scss';
import style from './Welcome.module.scss'
import {Box, Container, Grid, Typography, Button, CardContent, Card, CardMedia} from "@mui/material";
import { Link } from 'react-router-dom';
import { IconArrowBigRightFilled } from '@tabler/icons-react' 

const Welcome = () => {
    return (
        <div className={"welcome-page"}>
            <div className={style.centeredCard}>
                <Box sx={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 28,
                    fontWeight: 550,
                }}>
                    <CardContent>
                        <Typography variant='h1'>
                            Hệ thống quản lý check-in sự kiện ECM
                        </Typography>
                    </CardContent>
                </Box>
            </div>
            <div className={style.body__row}>
                <Grid
                    container
                    // spacing={3}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid container xs={4} alignItems="center" justifyContent="center">
                        <Box>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    sx={{ height: 300 }}
                                    image={require("../../../assets/images/welcome/welcome_item_01.jpg")}
                                    alt="Welcome"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Linh hoạt
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Hỗ trợ quản lý nhiều sự kiện với quy mô nhỏ và vừa
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>

                    <Grid container xs={4} alignItems="center" justifyContent="center">
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                image={require("../../../assets/images/welcome/welcome_item_02.jpg")}
                                alt="Welcome"
                                sx={{ height: 300 }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Tiện lợi
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Cấu hình đơn giản, dễ dàng sử dụng tại quầy hàng
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid container xs={4} alignItems="center" justifyContent="center">
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                sx={{ height: 300 }}
                                image={require("../../../assets/images/welcome/welcome_item_03.png")}
                                alt="Welcome"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Tin cậy
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Thống kê thông tin checkin, tiếp cận khách hàng hiệu quả
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            <Container className="welcome-body">
                <Grid>
                    {/* Your system description */}
                </Grid>
                <div className="buttons">
                    <Link to="/auth/login">
                        <Button startIcon={<IconArrowBigRightFilled/>}
                        >
                            Tham gia với chúng tôi ngay
                        </Button>
                    </Link>
                </div>
                <div className="buttons">

                </div>
            </Container>
            {/* Authors and copyright */}
            <Box
                sx={{
                    width: "100%",
                    height: "auto",
                    backgroundColor: "secondary.main",
                    paddingTop: "2rem",
                    paddingBottom: "2rem",
                }}
            >
                <Container maxWidth="lg">
                    <Grid container direction="column" alignItems="center">
                        <Grid item xs={12}>
                            <Typography color="white" variant="h5">
                                Event Checkin Management
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1"
                                sx={{
                                    color: "white",
                                    paddingTop: "1rem"
                                }}
                            >
                                {`© Copy right ${new Date().getFullYear()} - Author: Le Ha Hung references PhD. Nguyen Duc Tien`}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    );
};

export default Welcome;
