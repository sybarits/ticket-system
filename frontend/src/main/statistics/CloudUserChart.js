import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField, Checkbox, FormControlLabel } from '@mui/material';
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
    const [totalLineChartLabels, setTotalLineChartLabels] = useState([]);
    const [lineDataSets, setLineDataSets] = useState([]);
    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(0);
    const [showLabels, setShowLabels] = useState(false);

    const makeTotalPieChartData = (data) => {
        const cloudServiceList = Var.getCloudServiceTypeList();
        const result = [];
        for (let i=0; i<cloudServiceList.length; i++) {
            result.push(0);
        }
        const len = data.length;
        for (let i = 0; i < len; i++) {
            result[cloudServiceList.indexOf(data[i].cloud_service)] += 1;
        }
        setTotalPieChartData(result);
        return result;
    }

    const makeApplicationLineChartData = (data) => {
        const cloudServiceList = Var.getCloudServiceTypeList();
        const lineChartData = [];
        for (let i=0; i<cloudServiceList.length; i++) {
            lineChartData.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
        const len = data.length;
        const monthLabels = Day.makeMonthLabels();
        for (let i = 0; i < len; i++) {
            const index = Day.getMonthIndex(monthLabels, data[i].application_date);
            if (index != -1) {
                lineChartData[cloudServiceList.indexOf(data[i].cloud_service)][index] += 1;
            }
        }
        setTotalLineChartLabels(monthLabels);
        const temp = [];
        for (let i=0; i<lineChartData.length; i++) {
            temp.push({
                label: Var.getCloudServiceTypeList()[i],
                data: lineChartData[i],
                borderColor: Var.getLineColor()[cloudServiceList[i]],
                backgroundColor: Var.getLineColor()[cloudServiceList[i]],
                tension: 0.3,
            })
        }
        setLineDataSets(temp);
        return lineChartData;
    }

    const handleShowLabelsCheckboxChange = (e) => {
        setShowLabels(e.target.checked)
    }

    useEffect(() => {
        axios
            .get(Var.getServiceUrl() + "/openstatistics/users", AuthInfo.getAxiosConfig())
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
                    if (showLabels) {
                        return context.dataset.data[context.dataIndex] > 0;
                    } else {
                        return false;
                    }
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
        datasets: lineDataSets,
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
            <div>
                <FormControlLabel
                    control={
                        <Checkbox key={1} name="show_labels" onChange={handleShowLabelsCheckboxChange} />
                    }
                    label="show labels" key={1}
                />
            </div>
            <hr />
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
            {Var.getCloudServiceTypeList().map((service, index) => {
                return (
                    <CloudUserDoughnutLine cloudService={service} start={startDate} end={endDate} showLabels={showLabels} />
                )
            })}
            <IBMQInstitutionChart start={startDate} end={endDate} />
        </div>
    );
}

export default CloudUserChart;