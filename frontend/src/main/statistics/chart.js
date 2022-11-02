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
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';



import Var from '../Var.js';


function Chart() {

    const params = useParams();
    const chartType = params.chartType;

    const [ticket, setTicket] = useState([]);
    // const body = {"query_string": params.ticketId}
    useEffect(() => {
        axios
            .get(Var.getServiceUrl()+"ticket/" + params.ticketId)
            .then(({ data }) => setTicket(data));
    }, []);

    if (ticket.length !== 0) {
        return (
            <div style={{ width: '100%', height: 600, margin: '0 0 0 0' }}>
                Ticket # {ticket[0]._id}
                <Stack spacing={2} direction="row" justifyContent="end">
                    <Button variant="outlined">Save</Button>
                    <Button variant="outlined">Reset</Button>
                </Stack>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            id="ticket_type"
                            label="Ticket Type"
                            value={ticket[0].ticket_type}
                        />
                        <TextField
                            id="status"
                            label="Status"
                            value={ticket[0].status}
                        />
                        <TextField
                            id="create_time"
                            label="Name(EN)"
                            value={ticket[0].create_time}
                        />
                    </div>
                    <CloudUser userId={ticket[0].user._id} />
                </Box>


            </div>
        );
    } else {
        return (
            <div style={{ width: '100%', height: 600, margin: '0 0 0 0' }}>
                {/* User # {ticket[0]._id} */}
                <Stack spacing={2} direction="row" justifyContent="end">
                    <Button variant="outlined">Add User</Button>
                    <Button variant="outlined">Reset</Button>
                </Stack>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >

                </Box>


            </div>
        );
    }
}

export default Chart;