import React, { useState, useEffect } from "react";
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
    Filler,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';

import AuthInfo from "../auth/AuthInfo";
import Var from "../Var";

function NewResearcherStatistics() {
    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, Title, CategoryScale, LinearScale, PointElement, LineElement,BarElement,Filler,);

    const [researcher, setResearcher] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);
    const [lineTotalData, setLineTotalData] = useState([]);
    const [lineChartLabels, setLineChartLabels] = useState([]);
    const [barChartData, setBarChartData] = useState([]);

    const lineChartType = ["INTERNSHIP", "PROJECT"];
    const researcherStatus = ["APPLICATION", "FAIL", "CANCEL", "READY", "TRAINING", "FINISH", "EXTENSION"];

    const lineData = {
        labels: lineChartLabels,
        datasets: [
            // {
            //     label: "wow",
            //     data: lineChartData,
            //     // borderColor: Var.getLineColor()[cloudService],
            //     // backgroundColor: Var.getLineColor()[cloudService],
            //     tension: 0.3,
            // },
            {
                type: 'line',
                label: lineChartType[0],
                data: lineChartData[0],
                borderColor: 'rgb(255,99,132)',
                backgroundColor: 'rgb(255,99,132)',
                tension: 0.3,
                // fill: true
              },
              {
                type: 'line',
                label: lineChartType[1],
                data: lineChartData[1],
                borderColor: 'rgb(54,162,235)',
                backgroundColor: 'rgb(54,162,235)',
                tension: 0.3,
                // fill: true
              },
            {
                type: 'bar',
                barThickness: 0,
                label: 'Total',
                data: lineTotalData,
                borderColor: 'rgb(54,162,235)',
                backgroundColor: 'rgb(54,162,235)',
                // fill: true,
                tension: 0.3,
            },
        ],
    }

    const barData = {
        labels: lineChartLabels,
        datasets: [
            // {
            //     label: "wow",
            //     data: lineChartData,
            //     // borderColor: Var.getLineColor()[cloudService],
            //     // backgroundColor: Var.getLineColor()[cloudService],
            //     tension: 0.3,
            // },
            {
                type: 'bar',
                label: researcherStatus[0],
                data: barChartData[0],
                borderColor: 'rgb(255,99,132)',
                backgroundColor: 'rgb(255,99,132)',
              },
              {
                type: 'bar',
                label: researcherStatus[1],
                data: barChartData[1],
                borderColor: 'rgb(255, 159, 64)',
                backgroundColor: 'rgb(255, 159, 64)',
              },
            {
                type: 'bar',
                label: researcherStatus[2],
                data: barChartData[2],
                borderColor: 'rgb(255, 205, 86)',
                backgroundColor: 'rgb(255, 205, 86)',
            },
            {
                type: 'bar',
                label: researcherStatus[3],
                data: barChartData[3],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgb(75, 192, 192)',
              },
              {
                type: 'bar',
                label: researcherStatus[4],
                data: barChartData[4],
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgb(54, 162, 235)',
              },
            {
                type: 'bar',
                label: researcherStatus[5],
                data: barChartData[5],
                borderColor: 'rgb(153, 102, 255)',
                backgroundColor: 'rgb(153, 102, 255)',
            },
            {
                type: 'bar',
                label: researcherStatus[6],
                data: barChartData[6],
                borderColor: 'rgb(201, 203, 207)',
                backgroundColor: 'rgb(201, 203, 207)',
            },
        ],
    }

    const lineOptions = {
        plugins: {
        datalabels: {
            display: function (context) {
                return context.dataset.data[context.dataIndex] > 0;
            },
            font: {
                weight: 'bold'
            },
            // formatter: (value, ctx) => {
            //     console.log("ctx", ctx);
            //     let total = 0;
            //     let index = ctx.dataIndex;
            //     lineChartData.map((d,i) => {
            //         console.log("d",d);
            //         console.log("i",i);
            //         if (i === ctx.dataIndex+1) return;
            //         total += lineChartData[i][ctx.dataIndex];
            //     })
            //     return total;
            // },
            // display: function (ctx) {
            //     console.log("ctx",ctx);
            //     console.log("ctx.chart",ctx.chart);
            //     return true//ctx.datasetIndex === 4//ctx.chart;//.$totalizer.utmost
            // },
            anchor: 'start',
            align: 'end',
        }
        },
        maintainAspectRatio: false,

        scales: {
            x: {
                // stacked: true,
              },
            y: {
                stacked: true,
                beginAtZero: true,
                min: 0
            }
        },
        responsive: true,
    };

    const barOptions = {
        plugins: {
        datalabels: {
            display: function (context) {
                return context.dataset.data[context.dataIndex] > 0;
            },
            font: {
                weight: 'bold'
            },
            anchor: 'start',
            align: 'end',
        }
        },
        maintainAspectRatio: false,

        scales: {
            x: {
                stacked: true,
              },
            y: {
                stacked: true,
                beginAtZero: true,
                min: 0
            }
        },
        responsive: true,
    };

    const makeStackBarChartData = (data) => {
        console.log("makeStackBarChartData", data);
        let labels = new Set();
        const dataLength = data.length;
        for (let i=0; i<dataLength; i++) {
            labels.add(data[i].application_number);
        }
        labels = Array.from(labels);
        // setLineChartLabels(labels);
        
        const stackedBarChartData = [];
        for (let i=0; i<researcherStatus.length; i++) {
            stackedBarChartData[i]=Array.from({length: labels.length}, () => 0);
            for (let j=0; j<dataLength; j++) {
                if (data[j].status == researcherStatus[i]) {
                    stackedBarChartData[i][labels.indexOf(data[j].application_number)]++; 
                }
            }
        }
        console.log("stackedBarChartData ",stackedBarChartData);
        setBarChartData(stackedBarChartData);
    }

    const makeLineChartData = (data) => {
        let labels = new Set();
        const dataLength = data.length;
        for (let i=0; i<dataLength; i++) {
            labels.add(data[i].application_number);
        }
        labels = Array.from(labels);
        setLineChartLabels(labels);
        const lineData = Array.from({length: labels.length}, () => 0);
        for (let i=0; i<dataLength; i++) {
            lineData[labels.indexOf(data[i].application_number)]++;
        }
        const stackedLineChartData = [];
        for (let i=0; i<lineChartType.length; i++) {
            stackedLineChartData[i]=Array.from({length: labels.length}, () => 0);
            for (let j=0; j<dataLength; j++) {
                if (data[j].type == lineChartType[i]) {
                    stackedLineChartData[i][labels.indexOf(data[j].application_number)]++;
                }
            }
        }
        setLineChartData(stackedLineChartData);
        setLineTotalData(lineData);
    }

    useEffect(() => {
        axios
            .get(Var.getServiceUrl() + "/newresearcher/all", AuthInfo.getAxiosConfig())
            .then(({ data }) => {
                setResearcher(data);
                makeStackBarChartData(data);
                makeLineChartData(data);
            });
    }, []);



    return (
        <div style={{ position: "relative" }}>
            {/* <div style={{ width: 300, height: 400, margin: '0 0 0 0' }}>
                <div style={{ position: "absolute", margin: '0 0 0 0', top: 270, left: 120 }}>
                    {"total: " + pieChartData.reduce(function add(sum, curr) {
                        return sum + curr;
                    }, 0)}
                </div>
                <h2>{cloudService} Cloud Service Applicant</h2>
                <Doughnut data={pieData} options={pieOptions} />
            </div> */}
            <div style={{ width: 800, height: 300, margin: '0 0 0 0' }}>
                <h2>New Researcher Application State</h2>
                {/* <div style={{float: "right" }}>total: {lineChartData.reduce(function add(sum, curr) {
                        return sum + curr;
                    }, 0)}</div> */}
                <Line data={lineData} options={lineOptions} />
            </div>
            <div style={{ width: 800, height: 50, margin: '0 0 0 0' }}></div>
            <div style={{ width: 800, height: 300, margin: '0 0 0 0' }}>
                <h2>New Researcher Status</h2>
                {/* <div style={{float: "right" }}>total: {lineChartData.reduce(function add(sum, curr) {
                        return sum + curr;
                    }, 0)}</div> */}
                <Bar data={barData} options={barOptions} />
            </div>
        </div>
    );

}

export default NewResearcherStatistics;