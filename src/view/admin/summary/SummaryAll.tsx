import React, { useEffect, useState } from 'react';
import MainCard from "../../../components/cards/MainCard";
import { Typography } from "@mui/material";
import Chart, { ChartConfiguration, ChartType } from "chart.js/auto";
import eventsApi from "../../../services/eventsApi";

interface EventData {
    eventId: string;
    eventCode: string;
    eventName: string;
    eventDescription: string;
    startTime: string;
    endTime: string;
}

const SummaryAll: React.FC = () => {
    const [events, setEvents] = useState<EventData[]>([]);
    const [barChart, setBarChart] = useState<Chart | null>(null);

    const getEvents = () => {
        eventsApi
            .getEventsByAdmin()
            .then((res) => {
                const events = res.data.payload;
                setEvents(events);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    }

    useEffect(() => {
        getEvents();
    }, []); // Fetch events on mount

    useEffect(() => {
        const MONTHS = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const labels = MONTHS;
        const eventsPerMonth: number[] = Array(MONTHS.length).fill(0);
        const maxEvents = Math.max(...eventsPerMonth);
        const minEvents = Math.min(...eventsPerMonth);
        events.forEach((event) => {
            const monthIndex = new Date(event.startTime).getMonth();
            eventsPerMonth[monthIndex]++;
        });

        const barCanvas = document.getElementById('barChart') as HTMLCanvasElement;
        if (barChart) {
            barChart.destroy();
        }
        // @ts-ignore
        const barConfig: ChartConfiguration = {
            type: 'bar' as ChartType, // Specify the type explicitly
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total number of events per month',
                    backgroundColor: 'rgb(255, 99, 132)',
                    data: eventsPerMonth,
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: (maxEvents-minEvents)/12
                        }
                    },
                },
            },
        };

        const newBarChart = new Chart(barCanvas, barConfig);
        setBarChart(newBarChart);

    }, [events]); // Update chart when events change

    return (
        <MainCard title="Thống kê">
            <Typography variant="body2">Thống kê các sự kiện đã diễn ra, số lượng đối tác tham gia, số lượng POC, số lượng khách checkin</Typography>
            <div className="charts">
                <div className="chart">
                    <canvas id="lineChart" data-type="line" data-color-datalabels="#2e2a2a"></canvas>
                </div>
                <div className="chart">
                    <canvas id="barChart" data-type="bar" data-color-datalabels="#ffffff"></canvas>
                </div>
            </div>
        </MainCard>
    );
}

export default SummaryAll;
