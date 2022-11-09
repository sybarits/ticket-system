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
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import Var from '../Var.js';
import AuthInfo from "../auth/AuthInfo.js";


function IBMQInstitutionChart(props) {

    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, Title, CategoryScale, LinearScale, PointElement, LineElement,);
    const [totalInstPieChartData, setTotalInstPieChartData] = useState([]);

    const makeDwaveInstPieChartData = (data) => {
        const userInstitutionList = Var.getInstitutionList();
        const listLength = userInstitutionList.length;
        const result = Array.from({length: listLength}, () => 0);
        const len = data.length;
        for (let i = 0; i < len; i++) {
            if (data[i].cloud_service == "IBMQ") {
                result[userInstitutionList.indexOf(data[i].institution)] += 1;
            }
        }
        setTotalInstPieChartData(result);
        return result;
    }

    useEffect(() => {
        axios
            .get(Var.getServiceUrl() + "/user/all", AuthInfo.getAxiosConfig())
            .then(({ data }) => {
                makeDwaveInstPieChartData(data);
            });
    }, []);

    const instPieOptions = {
        plugins: [{
            datalabels: {
                font: {
                    weight: 'bold'
                },
            },

        }]
    };

    const instPieData = {
        labels: Var.getInstitutionList(),
        datasets: [{
            data: totalInstPieChartData,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(248,155,51)',
                'rgb(0, 205, 86)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(255, 0, 86)',
                'rgb(255, 99, 0)',
                'rgb(54, 162, 0)',
            ],
            hoverOffset: 4
        }]
    };

    return (
        <div>
            <div style={{ display: "inline-flex", position: "relative" }}>
                <div style={{ position: "absolute", margin: '0 0 0 0', top: 340, left: 220 }}>
                    {"total: " + totalInstPieChartData.reduce(function add(sum, curr) {
                        return sum + curr;
                    }, 0)}
                </div>
                <div style={{ width: 500, height: 600, margin: '0 0 0 0' }}>
                    <h2>IBMQ Cloud Service User By Institutions</h2>
                    <Doughnut data={instPieData} options={instPieOptions} />
                </div>
            </div>
        </div>
    );

}

export default IBMQInstitutionChart;