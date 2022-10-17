import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import CloudUserInputs from "./CloudUserInputs";

function CloudUser(props) {
    const params = useParams();
    if (props.userId != undefined) {
        params.userId = props.userId;
    }

    const [user, setUser] = useState([]);
    useEffect(() => {
        axios
            .get("http://192.168.137.86:8080/user/" + params.userId)
            .then(({ data }) => setUser(data));
    }, []);

    if (user.length != 0) {
        return (
            <div style={{ width: '100%', height: 600, margin: '0 0 0 0' }}>
                Cloud User # {user[0]._id}
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
                            id="cloud_service"
                            label="Cloud Service"
                            value={user[0].cloud_service}
                        />
                        <TextField
                            id="name_ko"
                            label="Name(KR)"
                            value={user[0].name_ko}
                        />
                        <TextField
                            id="name_us"
                            label="Name(EN)"
                            value={user[0].name_us}
                        />
                    </div>
                    <div>
                        <TextField
                            id="email"
                            label="Email"
                            value={user[0].email}
                        />
                        <TextField
                            id="status"
                            label="Status"
                            value={user[0].status}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            value={user[0].email}
                        />
                    </div>
                    <div>
                        <TextField
                            id="institution"
                            label="Institution"
                            value={user[0].institution}
                        />
                        <TextField
                            id="major"
                            label="Major"
                            value={user[0].major}
                        />
                        <TextField
                            id="position"
                            label="Position"
                            value={user[0].position}
                        />
                        <TextField
                            id="adviser"
                            label="Adviser"
                            value={user[0].adviser}
                        />
                    </div>
                    <div>
                        <TextField
                            id="application_date"
                            label="Application Date"
                            value={user[0].application_date}
                        />
                        <TextField
                            id="create_date"
                            label="Create Date"
                            value={user[0].create_date}
                        />
                    </div>
                    <div>
                        <TextField
                            id="perpose"
                            label="Perpose"
                            multiline
                            rows={3}
                            value={user[0].perpose}
                        />
                        <TextField
                            id="application_route"
                            label="Application Route"
                            multiline
                            rows={3}
                            value={user[0].application_route}
                        />
                    </div>
                    <div>
                        <TextField
                            id="etc"
                            label="etc"
                            multiline
                            rows={3}
                            value={user[0].etc}
                        />
                        <TextField
                            id="history"
                            label="history Route"
                            multiline
                            rows={3}
                            value={user[0].history}
                        />
                    </div>
                </Box>

            </div>
        );
    } else {
        return (
            <div style={{ width: '100%', height: 600, margin: '0 0 0 0' }}>
                No User # {params.userId}
                
            </div>
        );
    }
}

export default CloudUser;