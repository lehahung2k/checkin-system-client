import React from 'react';
import Chart from 'react-apexcharts';
import MainCard from "../../components/cards/MainCard";
import SubCard from "../../components/cards/SubCard";
import {Grid} from "@mui/material";

const PocDashboard = () => {
    const data = {
        series: [
            {
                name: "Khách tham dự",
                data: [100, 91, 121, 403, 321, 103, 217, 10]
            }
        ],
        options: {
            chart: {
                type: 'bar' as const,
                height: 550,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            },
            colors: ['#2196f3', '#247BA0'],
        }
    };

    const numberOfEvents = 10;
    const totalAttendees = 900;

    return (
        <MainCard title='Chào mừng đến với trang quản trị quầy check-in của doanh nghiệp đối tác'>
            <h1>Thống kê</h1>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={9}>
                    <Chart options={data.options} series={data.series} type="bar" height={350} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <SubCard title={"Số sự kiện"}>
                                <h2>Số sự kiện: {numberOfEvents}</h2>
                            </SubCard>
                        </Grid>
                        <Grid item xs={12}>
                            <SubCard title={"Số khách tham dự"}>
                                <h2>Số khách tham dự: {totalAttendees}</h2>
                            </SubCard>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default PocDashboard;
