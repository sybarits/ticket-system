import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Stack, Button } from '@mui/material';
import AuthInfo from "./AuthInfo.js";

import Var from '../Var.js';

function SignIn() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        const postData = {
            "userId": userId,
            "password": password,
            "roles": "USER"
        }
        axios
            .post(Var.getServiceUrl() + "/signin", postData)
            .then(({ data }) => {
                if (data.result == 'success') {
                    AuthInfo.setID(userId);
                    AuthInfo.setRole(data.roles);
                    AuthInfo.setToken(data.token);
                    alert("Login Success!");
                    navigate("/");
                } else {
                    alert("Login Fail!");
                    Var.refreshPage();
                }
            });
    }

    const handlePasswordOnKeyUp = (e) => {
        if (e.keyCode == 13) {
            handleLogin();
        }

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
                        sx={{ width: 360 }}
                    />
                </div>
                <div>
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        onChange={(v) => setPassword(v.target.value)}
                        onKeyUp={handlePasswordOnKeyUp}
                        sx={{ width: 360 }}
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
