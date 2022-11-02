import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CloudUser from '../cloud_user/CloudUser.js';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import Var from '../Var.js';


function DwaveUserChart(props) {

    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, Title, CategoryScale, LinearScale, PointElement, LineElement,);
    const [totalPieChartData, setTotalPieChartData] = useState([]);
    const [today, setToday] = useState([]);
    const [totalLineChartData, setTotalLineChartData] = useState([]);
    const [totalLineChartLabels, setTotalLineChartLabels] = useState([]);

    const makeDwavePieChartData = (data) => {
        const userGroupList = Var.getUserGroupList();
        const result = [0, 0, 0];
        const len = data.length;
        for (let i = 0; i < len; i++) {
            if (data[i].cloud_service == "DWAVE") {
                result[userGroupList.indexOf(data[i].group)] += 1;
            }
        }
        setTotalPieChartData(result);
        return result;
    }

    const makeDwaveLineChartData = (data) => {
        const cloudServiceList = Var.getCloudServiceTypeList();
        const result = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
        const len = data.length;
        const monthLabels = makeMonthLabels();
        for (let i = 0; i < len; i++) {
            if (data[i].cloud_service == "DWAVE") {
                const index = getMonthIndex(monthLabels, data[i].application_date);
                if (index != -1) {
                    result[cloudServiceList.indexOf(data[i].cloud_service)][index] += 1;
                }
            }
        }
        
        setTotalLineChartData(result);
        return result;
    }

    const makeMonthLabels = () => {
        let yearMonth = getThisYearMonth();
        const monthLabels = [];
        for (let i = 11; i >= 0; i--) {
            monthLabels[i] = yearMonth;
            yearMonth = getPrevMonth(yearMonth);
        }
        setTotalLineChartLabels(monthLabels);
        return monthLabels;//
    }

    const getPrevMonth = (day) => {//day will be 202207
        let mon = day.substring(4, 6);
        let year = day.substring(0, 4);
        mon = parseInt(mon);
        year = parseInt(year);
        return ((mon - 1) == 0) ? String(year - 1) + "12" : String(year) + String(('0' + (mon - 1)).slice(-2));
    }

    const getMonthIndex = (monthLabels, application_date) => {//application_date will like "2022-06-02T14:59:08.000Z"
        if (application_date == undefined || application_date == null) return -1;
        const applicationYearMonth = application_date.substring(0, 4) + application_date.substring(5, 7);
        return monthLabels.indexOf(applicationYearMonth);
    }

    const getThisYearMonth = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        return year + month;//202207
    }

    const getToday = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        setToday(year + month + day + '000000');
        return year + month + day + '000000';
    };

    useEffect(() => {
        axios
            .get(Var.getServiceUrl() + "/user/all")
            .then(({ data }) => {
                makeDwavePieChartData(data);
                makeDwaveLineChartData(data);
            });
    }, []);

    const pieOptions = {
        // responsive: false,
        // scales: {
        //     yAxes: [
        //         {
        //             ticks: {
        //                 beginAtZero: true,
        //             },
        //         },
        //     ],
        // },
        plugins: {
            datalabels: {
                font: {
                    weight: 'bold'
                },
            }
        }
    };

    const pieData = {
        // plugins: [ChartDataLabels],
        labels: Var.getUserGroupList(),
        datasets: [{
            data: totalPieChartData,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    const lineOptions = {
        plugins: {
            datalabels: {
                display: function (context) {
                    return context.dataset.data[context.dataIndex] > 0;
                },
                font: {
                    weight: 'bold'
                },
                formatter: Math.round,
                anchor: 'start',
                align: 'end',
            }
        },
        maintainAspectRatio: false,

        scales: {
            y: {
                beginAtZero: true,
                min: 0
            }
        },
    };
    const lineData = {
        labels: totalLineChartLabels,
        datasets: [
            {
                label: Var.getCloudServiceTypeList()[2],
                data: totalLineChartData[2],
                borderColor: 'rgb(23, 190, 187)',
                backgroundColor: 'rgb(23, 190, 187)',
                tension: 0.3,
            },
        ],
    }


    return (
        <div style={{ display: "inline-flex" }}>
            <div style={{ width: 300, height: 400, margin: '0 0 0 0' }}>
                <h2>Dwave Cloud Service User</h2>
                <Doughnut data={pieData} options={pieOptions} />
            </div>
            <div style={{ width: 800, height: 300, margin: '0 0 0 0' }}>
                <h2>D-wave Service Application State</h2>
                <Line data={lineData} options={lineOptions} />
            </div>
        </div>
    );

}

export default DwaveUserChart;