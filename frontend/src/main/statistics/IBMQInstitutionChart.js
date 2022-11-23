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
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import Var from '../Var.js';
import AuthInfo from "../auth/AuthInfo.js";
import IBMQUserDoughnut from "./IBMQUserDoughnut.js";


function IBMQInstitutionChart(props) {

    const [year, setYear] = useState("total");

    return (
        <div>
            <div>
                <TextField
                    id="year_date"
                    label="Year"
                    onChange={(v) => setYear(v.target.value)}
                    placeholder="ex) 2021(YYYY)"
                    defaultValue={""}
                    type="number"
                    sx={{ m: 1, width: 260 }}
                />
            </div>
            <IBMQUserDoughnut year={"total"} />
            <IBMQUserDoughnut year={year} />
        </div>
    );
}

export default IBMQInstitutionChart;