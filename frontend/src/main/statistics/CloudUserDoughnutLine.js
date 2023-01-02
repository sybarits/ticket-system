import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import Var from '../Var.js';
import Day from "../util/Day.js";
import AuthInfo from "../auth/AuthInfo.js";


function CloudUserDoughnutLine(props) {

    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, Title, CategoryScale, LinearScale, PointElement, LineElement,);
    const [pieChartData, setPieChartData] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);
    const [totalLineChartLabels, setTotalLineChartLabels] = useState([]);
    const cloudService = props.cloudService;
    const showLabels = props.showLabels;
    let start, end;
    if (props.start.toString().length == 6) {
        start = props.start;
    }
    if (props.end.toString().length == 6) {
        end = props.end;
    }

    const makeDwavePieChartData = (data) => {
        let userList = [];
        if (cloudService == "IBMQ") {
            userList = Var.getEduGroupList();
        } else {
            userList = Var.getUserGroupList();
        }
        const result = [0, 0, 0];
        const len = data.length;
        for (let i = 0; i < len; i++) {
            if (data[i].cloud_service == cloudService) {
                result[userList.indexOf(data[i].group)] += 1;
            }
        }
        setPieChartData(result);
        return result;
    }

    const makeLineChartData = (data) => {
        let monthLength = 12;
        let monthLabels = [];
        if (start == undefined || end == undefined) {
            monthLabels = Day.makeMonthLabels();
        } else {
            monthLabels = Day.makeStartEndMonthLabels(start, end);
            monthLength = Day.getMonthLength(start, end);
        }
        const result = Array.from({length: monthLength}, () => 0);
        const len = data.length;
        
        for (let i = 0; i < len; i++) {
            if (data[i].cloud_service == cloudService) {
                const index = Day.getMonthIndex(monthLabels, data[i].application_date);
                if (index != -1) {
                    result[index] += 1;
                }
            }
        }
        setTotalLineChartLabels(monthLabels);
        setLineChartData(result);
        return result;
    }

    useEffect(() => {
        
        axios
            .get(Var.getServiceUrl() + "/openstatistics/users", AuthInfo.getAxiosConfig())
            .then(({ data }) => {
                makeDwavePieChartData(data);
                makeLineChartData(data);
            });
    }, [start, end]);

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
        labels: (cloudService == "IBMQ" ? Var.getEduGroupList() : Var.getUserGroupList()),
        datasets: [{
            data: pieChartData,
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
        datasets: [
            {
                label: cloudService,
                data: lineChartData,
                borderColor: Var.getLineColor()[cloudService],
                backgroundColor: Var.getLineColor()[cloudService],
                tension: 0.3,
            },
        ],
    }


    return (
        <div style={{ display: "inline-flex", position: "relative" }}>
            <div style={{ width: 300, height: 400, margin: '0 0 0 0' }}>
                <div style={{ position: "absolute", margin: '0 0 0 0', top: 270, left: 120 }}>
                    {"total: " + pieChartData.reduce(function add(sum, curr) {
                        return sum + curr;
                    }, 0)}
                </div>
                <h2>{cloudService} Cloud Service Applicant</h2>
                <Doughnut data={pieData} options={pieOptions} />
            </div>
            <div style={{ width: 800, height: 300, margin: '0 0 0 0' }}>
                <h2>{cloudService} Application State</h2>
                <div style={{float: "right" }}>total: {lineChartData.reduce(function add(sum, curr) {
                        return sum + curr;
                    }, 0)}</div>
                <Line data={lineData} options={lineOptions} />
            </div>
        </div>
    );

}

export default CloudUserDoughnutLine;