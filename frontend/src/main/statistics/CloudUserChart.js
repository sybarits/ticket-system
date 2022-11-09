import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
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
import Day from "../util/Day.js";
import IBMQInstitutionChart from "./IBMQInstitutionChart.js";
import CloudUserDoughnutLine from "./CloudUserDoughnutLine.js";
import AuthInfo from "../auth/AuthInfo.js";


function CloudUserChart(props) {
    const chartType = props.type;

    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, Title, CategoryScale, LinearScale, PointElement, LineElement,);
    const [totalPieChartData, setTotalPieChartData] = useState([]);
    const [totalLineChartData, setTotalLineChartData] = useState([]);
    const [totalLineChartLabels, setTotalLineChartLabels] = useState([]);
    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(0);

    const makeTotalPieChartData = (data) => {
        const cloudServiceList = Var.getCloudServiceTypeList();
        const result = [0, 0, 0];
        const len = data.length;
        for (let i = 0; i < len; i++) {
            result[cloudServiceList.indexOf(data[i].cloud_service)] += 1;
        }
        setTotalPieChartData(result);
        return result;
    }

    const makeApplicationLineChartData = (data) => {
        const cloudServiceList = Var.getCloudServiceTypeList();
        const result = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
        const len = data.length;
        const monthLabels = Day.makeMonthLabels();
        for (let i = 0; i < len; i++) {
            const index = Day.getMonthIndex(monthLabels, data[i].application_date);
            if (index != -1) {
                result[cloudServiceList.indexOf(data[i].cloud_service)][index] += 1;
            }
        }
        setTotalLineChartLabels(monthLabels);
        setTotalLineChartData(result);
        return result;
    }

    useEffect(() => {
        axios
            .get(Var.getServiceUrl() + "/user/all", AuthInfo.getAxiosConfig())
            .then(({ data }) => {
                makeTotalPieChartData(data);
                makeApplicationLineChartData(data);
                setEndDate(Day.getThisYearMonth());
            });
    }, []);

    const pieOptions = {
        plugins: {
            datalabels: {
                font: {
                    weight: 'bold'
                },
            }
        }
    };

    const pieData = {
        labels: Var.getCloudServiceTypeList(),
        datasets: [{
            data: totalPieChartData,
            backgroundColor: [
                'rgb(0, 64, 178)',
                'rgb(248, 155, 51)',
                'rgb(23, 190, 187)'
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
                label: Var.getCloudServiceTypeList()[0],
                data: totalLineChartData[0],
                borderColor: 'rgb(0, 64, 178)',
                backgroundColor: 'rgb(0,64,178)',
                tension: 0.3,
            },
            {
                label: Var.getCloudServiceTypeList()[1],
                data: totalLineChartData[1],
                borderColor: 'rgb(248, 155, 51)',
                backgroundColor: 'rgb(248, 155, 51)',
                tension: 0.3,
            },
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
        <div>
            <div style={{ display: "inline-flex", position: "relative" }}>
                <div style={{ width: 300, height: 400, margin: '0 0 0 0' }}>
                    <div style={{ position: "absolute", margin: '0 0 0 0', top: 220, left: 120 }}>
                        {"total: " + totalPieChartData.reduce(function add(sum, curr) {
                            return sum + curr;
                        }, 0)}
                    </div>
                    <h2>Total Application</h2>
                    <Doughnut data={pieData} options={pieOptions} />
                </div>
                <div style={{ width: 800, height: 300, margin: '0 0 0 0' }}>
                    <h2>Application State</h2>
                    <Line data={lineData} options={lineOptions} />
                </div>
            </div>
            <hr/>
            <div>
                <TextField
                    id="start_date"
                    label="Start"
                    onChange={(v) => setStartDate(v.target.value)}
                    placeholder="ex) 202205(YYYYMM)"
                    defaultValue={""}
                    type="number"
                    sx={{ m: 1, width: 260 }}
                />
                <TextField
                    id="end_date"
                    label="End"
                    onChange={(v) => setEndDate(v.target.value)}
                    placeholder="ex) 202210(YYYYMM)"
                    defaultValue={""}
                    type="number"
                    sx={{ m: 1, width: 260 }}
                />
            </div>
            <CloudUserDoughnutLine cloudService={"IONQ"} start={startDate} end={endDate}/>
            <CloudUserDoughnutLine cloudService={"DWAVE"} start={startDate} end={endDate}/>
            <CloudUserDoughnutLine cloudService={"IBMQ"} start={startDate} end={endDate}/>
            <IBMQInstitutionChart start={startDate} end={endDate} />
        </div>
    );
}

export default CloudUserChart;