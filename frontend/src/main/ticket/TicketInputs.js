import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CloudUser from '../cloud_user/CloudUser.js';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Config from '../config.js';

function TicketInputs(props) {

    const params = useParams();
    if (props.ticket != undefined) {
        params.ticket = props.ticket;
    }

    // const [ticket, setTicket] = useState([]);
    // const body = {"query_string": params.ticketId}
    // useEffect(() => {
    //     axios
    //       .get(Config.getServiceUrl()+"ticket/"+params.ticketId)
    //       .then(({data}) => setTicket(data));
    // }, []);
    
    if (props.ticket[0] != undefined && props.ticket[0] != null) {
        const ticket = props.ticket[0];
        console.log(ticket);
        return (
            <div style={{ width: '100%', height: 600, margin: '0 0 0 0' }}>
                
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
                            value={ticket.ticket_type}
                        />
                        <TextField
                            id="status"
                            label="Status"
                            value={ticket.status}
                        />
                        <TextField
                            id="create_time"
                            label="Name(EN)"
                            value={ticket.create_time}
                        />
                    </div>
                    <CloudUser userId={ticket.user._id}/>
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
                No Ticket # {props.id}
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
                            value={""}
                        />
                        <TextField
                            id="status"
                            label="Status"
                            value={""}
                        />
                        <TextField
                            id="create_time"
                            label="Name(EN)"
                            value={""}
                        />
                    </div>
                    <CloudUser userId={""}/>
                </Box>


            </div>
        );
    }
}

export default TicketInputs;