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
import Colors from "../util/Colors";

function NewResearcherStatistics() {
    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, Title, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Filler,);

    const [researcher, setResearcher] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);
    const [lineTotalData, setLineTotalData] = useState([]);
    const [lineChartLabels, setLineChartLabels] = useState([]);
    const [barChartDatasets, setBarChartDatasets] = useState([]);
    const [totalInstPieChartData, setTotalInstPieChartData] = useState([]);
    const [instPieChartLabels, setInstPieChartLabels] = useState([]);
    const [deptPieChartData, setDeptPieChartData] = useState([]);
    const [deptPieChartLabels, setDeptPieChartLabels] = useState([]);
    const [contryPieChartData, setContryPieChartData] = useState([]);
    const [contryPieChartLabels, setContryPieChartLabels] = useState([]);
    const [instDataSum, setInstDataSum] = useState([]);
    const [deptDataSum, setDeptDataSum] = useState([]);
    const [contryDataSum, setContryDataSum] = useState([]);

    const lineChartType = ["INTERNSHIP", "PROJECT", "선발"];
    const researcherStatus = ["APPLICATION", "FAIL", "CANCEL", "READY", "TRAINING", "FINISH", "EXTENSION"];
    const stackedBarLabels = {
        "INTERNSHIP":["인턴쉽 지원", "인턴쉽 탈락", "인턴쉽 취소", "인턴쉽 준비", "인턴쉽 중", "인턴쉽 종료", "인턴쉽 연장"],
        "PROJECT":["프로젝트 지원", "프로젝트 탈락", "프로젝트 취소", "프로젝트 준비", "프로젝트 중", "프로젝트 종료", "프로젝트 연장"],
    };
    const stackedBarChartData = {
        "INTERNSHIP":[],
        "PROJECT":[]
    };

    const lineData = {
        labels: lineChartLabels,
        datasets: [
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
                type: 'line',
                label: lineChartType[2],
                data: lineChartData[2],
                borderColor: 'rgb(255, 159, 64)',
                backgroundColor: 'rgb(255, 159, 64)',
                // fill: true,
                tension: 0.3,
            },
        ],
    }

    const barData = {
        labels: lineChartLabels,
        datasets: barChartDatasets,
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
                // stacked: true,
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

    const pieOptions = {
        plugins: [{
            datalabels: {
                font: {
                    weight: 'bold'
                },
            },

        }]
    };

    const instPieData = {
        labels: instPieChartLabels,
        datasets: [{
            data: totalInstPieChartData,
            backgroundColor: Colors.list,
            hoverOffset: 4
        }]
    };

    const deptPieData = {
        labels: deptPieChartLabels,
        datasets: [{
            data: deptPieChartData,
            backgroundColor: Colors.list,
            hoverOffset: 4
        }]
    };

    const contryPieData = {
        labels: contryPieChartLabels,
        datasets: [{
            data: contryPieChartData,
            backgroundColor: Colors.list,
            hoverOffset: 4
        }]
    };

    const makeStackBarChartData = (data) => {
        // console.log("makeStackBarChartData", data);
        let labels = new Set();
        const dataLength = data.length;
        for (let i = 0; i < dataLength; i++) {
            labels.add(data[i].application_number);
        }
        labels = Array.from(labels);
        
        for (let i = 0; i < researcherStatus.length; i++) {
            stackedBarChartData["INTERNSHIP"][i] = Array.from({ length: labels.length }, () => 0);
            stackedBarChartData["PROJECT"][i] = Array.from({ length: labels.length }, () => 0);
            for (let j = 0; j < dataLength; j++) {
                if (data[j].type == "INTERNSHIP") {
                    if (data[j].status == researcherStatus[i]) {
                        stackedBarChartData["INTERNSHIP"][i][labels.indexOf(data[j].application_number)]++;
                    }
                } else if (data[j].type == "PROJECT") {
                    if (data[j].status == researcherStatus[i]) {
                        stackedBarChartData["PROJECT"][i][labels.indexOf(data[j].application_number)]++;
                    }
                }
            }
        }

        let datasets = [];

        for (let i = 0; i < 7; i++) {
            let temp = {
                type: 'bar',
                label: stackedBarLabels["INTERNSHIP"][i],
                data: stackedBarChartData["INTERNSHIP"][i],
                borderColor: Colors.list[i],
                backgroundColor: Colors.list[i],
                stack: 'INTERNSHIP',
            }
            datasets.push(temp);
        }
        for (let i = 0; i < 7; i++) {
            let temp = {
                type: 'bar',
                label: stackedBarLabels["PROJECT"][i],
                data: stackedBarChartData["PROJECT"][i],
                borderColor: Colors.list_t[i],
                backgroundColor: Colors.list_t[i],
                stack: 'PROJECT',
            }
            datasets.push(temp);
        }
        setBarChartDatasets(datasets);
    }

    const makeLineChartData = (data) => {
        let labels = new Set();
        const dataLength = data.length;
        for (let i = 0; i < dataLength; i++) {
            labels.add(data[i].application_number);
        }
        labels = Array.from(labels);
        setLineChartLabels(labels);
        const lineData = Array.from({ length: labels.length }, () => 0);
        for (let i = 0; i < dataLength; i++) {
            lineData[labels.indexOf(data[i].application_number)]++;
        }
        const researcherLineChartData = [];
        for (let i = 0; i < lineChartType.length; i++) {
            researcherLineChartData[i] = Array.from({ length: labels.length }, () => 0);
            for (let j = 0; j < dataLength; j++) {
                if (data[j].type == lineChartType[i]) {
                    researcherLineChartData[i][labels.indexOf(data[j].application_number)]++;
                }
            }
        }
        for (let j = 0; j < dataLength; j++) {
            if (data[j].type != "FAIL") {
                researcherLineChartData[2][labels.indexOf(data[j].application_number)]++;
            }
        }
        // console.log("researcherLineChartData", researcherLineChartData); 
        setLineChartData(researcherLineChartData);
        setLineTotalData(lineData);
    }

    const makePieChartData = (data) => {
        let instLabels = new Set();
        let deptLabels = new Set();
        let contryLabels = new Set();
        const dataLength = data.length;
        for (let i = 0; i < dataLength; i++) {
            if (data[i].type != "FAIL") {
                instLabels.add(data[i].institution);
                deptLabels.add(data[i].major);
                contryLabels.add(data[i].training_contry);
            }
        }
        instLabels = Array.from(instLabels);
        deptLabels = Array.from(deptLabels);
        contryLabels = Array.from(contryLabels);
        setInstPieChartLabels(instLabels);
        setDeptPieChartLabels(deptLabels);
        setContryPieChartLabels(contryLabels);

        let instData = Array.from({ length: instLabels.length }, () => 0);
        let deptData = Array.from({ length: deptLabels.length }, () => 0);
        let contryData = Array.from({ length: contryLabels.length }, () => 0);
        for (let i=0; i<dataLength; i++) {
            if (data[i].type != "FAIL") {
                instData[instLabels.indexOf(data[i].institution)]++;
                deptData[deptLabels.indexOf(data[i].major)]++;
                contryData[contryLabels.indexOf(data[i].training_contry)]++;
            }
        }
        setTotalInstPieChartData(instData);
        setDeptPieChartData(deptData);
        setContryPieChartData(contryData);
        setInstDataSum(instData.reduce(function add(sum, curr) {
            return sum + curr;
        }, 0));
        setDeptDataSum(deptData.reduce(function add(sum, curr) {
            return sum + curr;
        }, 0));
        setContryDataSum(contryData.reduce(function add(sum, curr) {
            return sum + curr;
        }, 0));
    }

    useEffect(() => {
        axios
            .get(Var.getServiceUrl() + "/newresearcher/all", AuthInfo.getAxiosConfig())
            .then(({ data }) => {
                setResearcher(data);
                makeStackBarChartData(data);
                makeLineChartData(data);
                makePieChartData(data);
            });
    }, []);



    return (
        <div style={{ position: "relative" }}>
            <div style={{ width: 1000, height: 300, margin: '0 0 0 0' }}>
                <h2>신진 연구원 지원자 현황</h2>
                {/* <div style={{float: "right" }}>total: {lineChartData.reduce(function add(sum, curr) {
                        return sum + curr;
                    }, 0)}</div> */}
                <Line data={lineData} options={lineOptions} />
            </div>
            <div style={{ width: 80, height: 80, margin: '0 0 0 0' }}></div>
            <div style={{ width: 1000, height: 300, margin: '0 0 0 0' }}>
                <h2>신진연구원 상태</h2>
                {/* <div style={{float: "right" }}>total: {lineChartData.reduce(function add(sum, curr) {
                        return sum + curr;
                    }, 0)}</div> */}
                <Bar data={barData} options={barOptions} />
            </div>
            <div style={{ width: 80, height: 80, margin: '0 0 0 0' }}></div>
            <div style={{ display: "inline-flex", position: "relative" }}>
                <div style={{ position: "absolute", margin: '0 0 0 0', top: 340, left: 220 }}>
                    {"total: " + instDataSum}
                </div>
                <div style={{ width: 500, height: 600, margin: '0 0 0 0' }}>
                    <h2>소속 기관별 연구자 현황</h2>
                    <Doughnut data={instPieData} options={pieOptions} />
                </div>
            </div>
            <div style={{ display: "inline-flex", position: "relative" }}>
                <div style={{ position: "absolute", margin: '0 0 0 0', top: 340, left: 220 }}>
                    {"total: " + deptDataSum}
                </div>
                <div style={{ width: 500, height: 600, margin: '0 0 0 0' }}>
                    <h2>전공별 연구자 현황</h2>
                    <Doughnut data={deptPieData} options={pieOptions} />
                </div>
            </div>
            <div style={{ display: "inline-flex", position: "relative" }}>
                <div style={{ position: "absolute", margin: '0 0 0 0', top: 340, left: 220 }}>
                    {"total: " + contryDataSum}
                </div>
                <div style={{ width: 500, height: 600, margin: '0 0 0 0' }}>
                    <h2>연수 나라별 연구자 현황</h2>
                    <Doughnut data={contryPieData} options={pieOptions} />
                </div>
            </div>
            
        </div>
    );

}

export default NewResearcherStatistics;