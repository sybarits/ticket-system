import React, { useState, useRef } from "react";
import { useParams, redirect } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import AuthInfo from "./AuthInfo.js";

import Var from '../Var.js';

function SignIn() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        const postData = {
            "userId": userId,
            "password": password,
            "roles": "USER"
        }
        axios
            .post(Var.getServiceUrl() + "/signin", postData)
            .then(({ data }) => {
                AuthInfo.setID(userId);
                AuthInfo.setRole("USER");
                AuthInfo.setToken(data.token);
                alert("Login Success!");
                redirect("/home");
            });
    }

    return (
        <div style={{ position: "absolute", width: '70%', top:150, margin: '0 0 0 0' }}>
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
                        id="userId"
                        label="User ID"
                        onChange={(v) => setUserId(v.target.value)}
                        sx={{ width: 460 }}
                    />
                </div>
                <div>
                    <TextField
                        id="password"
                        label="Password"
                        onChange={(v) => setPassword(v.target.value)}
                        sx={{ width: 460 }}
                    />
                </div>
            </Box>
            <Stack spacing={2} direction="row" justifyContent="end" sx={{ m: 1 }} >
                <Button variant="outlined" onClick={handleLogin}>Login</Button>
                <Button variant="outlined" onClick={Var.refreshPage}>Reset</Button>
            </Stack>
        </div>
    )
}

export default SignIn;
