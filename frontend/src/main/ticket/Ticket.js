import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CloudUser from '../cloud_user/CloudUser.js';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Config from '../config.js';
import TicketInputs from "./TicketInputs.js";

function Ticket() {

    const params = useParams();

    const [ticket, setTicket] = useState([]);
    // const body = {"query_string": params.ticketId}
    useEffect(() => {
        axios
            .get(Config.getServiceUrl() + "ticket/" + params.ticketId)
            .then(({ data }) => setTicket(data));
    }, []);

    if (ticket.length != 0) {
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
                </Box>
                {ticket.ticket_type == "USER" && <CloudUser userId={ticket[0].user._id} /> }

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
                No Ticket # {params.ticketId}

            </div>
        );
    }

}

export default Ticket;