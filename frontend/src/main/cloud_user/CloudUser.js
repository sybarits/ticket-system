import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Config from '../config.js';
import CloudUserInputs from "./CloudUserInputs";

function CloudUser(props) {

    const [disable, setDisable] = useState(false);
    const [cloudService, setCloudService] = useState("IBMQ");
    const [nameKo, setNameKo] = useState("");
    const [nameUs, setNameUs] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [phone, setPhone] = useState("");
    const [institution, setInstitution] = useState("");
    const [major, setMajor] = useState("");
    const [position, setPosition] = useState("");
    const [adviser, setAdviser] = useState("");
    const [usage, setUsage] = useState("");
    const [quota, setQuota] = useState("");
    const [applicationDate, setApplicationDate] = useState("");
    const [createDate, setCreateDate] = useState("");
    const [perpose, setPerpose] = useState("");
    const [applicationRoute, setApplicationRoute] = useState("");
    const [etc, setEtc] = useState("");
    const [history, setHistory] = useState("");
    const [privateInfo, setPrivateInfo] = useState("");

    const params = useParams();
    if (props.userId != undefined) {
        params.userId = props.userId;
    }

    const refreshPage = (e) => {
        window.location.reload(false);
    }

    const resultData = (data) => {
        console.log("complete upload data", data);
    };

    const [user, setUser] = useState([]);

    const setUserData = (data) => {
        setUser(data);
        console.log("data",data);
        console.log("user",user);
        setCloudService(data[0].cloud_service);
        setNameKo(data[0].name_ko);
        setNameUs(data[0].name_us);
        setEmail(data[0].email);
        setStatus(data[0].status);
        setPhone(data[0].phone);
        setInstitution(data[0].institution);
        setMajor(data[0].major);
        setPosition(data[0].position);
        setAdviser(data[0].adviser);
        setUsage(data[0].usage);
        setQuota(data[0].quota);
        setApplicationDate(data[0].application_date);
        setCreateDate(data[0].create_date);
        setPerpose(data[0].perpose);
        setApplicationRoute(data[0].application_route);
        setEtc(data[0].etc);
        setHistory(data[0].history);
        setPrivateInfo(data[0].private_info);

    };

    useEffect(() => {
        axios
            .get(Config.getServiceUrl() + "/user/" + params.userId)
            .then(({ data }) => setUserData(data));
    }, []);

    const uploadData = (data) => {
        axios
            .put(Config.getServiceUrl() + "/user", { "userList": data })
            .then(({ data }) => {
                resultData(data);
                setDisable(false);
            });
    };

    const handleSaveChanges = (e) => {
        setDisable(true);
        console.log("e", e);
        const data = [{}];
        data[0].cloud_service = cloudService;
        data[0].name_ko = nameKo;
        data[0].name_us = nameUs;
        data[0].email = email;
        data[0].status = status;
        data[0].phone = phone;
        data[0].institution = institution;
        data[0].major = major;
        data[0].position = position;
        data[0].adviser = adviser;
        data[0].usage = usage;
        data[0].quota = quota;
        data[0].application_date = applicationDate;
        data[0].create_date = createDate;
        data[0].perpose = perpose;
        data[0].application_route = applicationRoute;
        data[0].etc = etc;
        data[0].history = history;
        data[0].private_info = privateInfo;
        // console.log("data",data);
        uploadData(data);
    }

    if (user.length != 0) {
        return (
            <div style={{ width: '100%', height: 600, margin: '0 0 0 0' }}>
                {/* Cloud User # {user[0]._id} */}
                <Stack spacing={2} direction="row" justifyContent="end" sx={{ m: 1 }}>

                    <Button variant="outlined" onClick={handleSaveChanges} disabled={disable}>Save Changes</Button>
                    <Button variant="outlined" onClick={refreshPage}>Reset</Button>
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
                            onChange={(v) => setCloudService(v.target.value)}
                            defaultValue={cloudService}
                        />
                        <TextField
                            id="name_ko"
                            label="Name(KR)"
                            onChange={(v) => setNameKo(v.target.value)}
                            defaultValue={nameKo}
                        />
                        <TextField
                            id="name_us"
                            label="Name(EN)"
                            onChange={(v) => setNameUs(v.target.value)}
                            defaultValue={nameUs}
                        />
                    </div>
                    <div>
                        <TextField
                            id="email"
                            label="Email"
                            onChange={(v) => setEmail(v.target.value)}
                            defaultValue={email}
                        />
                        <TextField
                            id="status"
                            label="Status"
                            onChange={(v) => setStatus(v.target.value)}
                            defaultValue={status}
                        />
                        <TextField
                            id="Phone"
                            label="phone"
                            onChange={(v) => setPhone(v.target.value)}
                            defaultValue={phone}
                        />
                    </div>
                    <div>
                        <TextField
                            id="institution"
                            label="Institution"
                            onChange={(v) => setInstitution(v.target.value)}
                            defaultValue={institution}
                        />
                        <TextField
                            id="major"
                            label="Major"
                            onChange={(v) => setMajor(v.target.value)}
                            defaultValue={major}
                        />
                        <TextField
                            id="position"
                            label="Position"
                            onChange={(v) => setPosition(v.target.value)}
                            defaultValue={position}
                        />
                        <TextField
                            id="adviser"
                            label="Adviser"
                            onChange={(v) => setAdviser(v.target.value)}
                            defaultValue={adviser}
                        />
                    </div>
                    <div>
                        <TextField
                            id="usage"
                            label="Usage"
                            onChange={(v) => setUsage(v.target.value)}
                            defaultValue={usage}
                        />
                        <TextField
                            id="quota"
                            label="Quota"
                            onChange={(v) => setQuota(v.target.value)}
                            defaultValue={quota}
                        />
                        <TextField
                            id="application_date"
                            label="Application Date"
                            onChange={(v) => setApplicationDate(v.target.value)}
                            defaultValue={applicationDate}
                        />
                        <TextField
                            id="create_date"
                            label="Create Date"
                            onChange={(v) => setCreateDate(v.target.value)}
                            defaultValue={createDate}
                        />
                    </div>
                    <div>
                        <TextField
                            id="perpose"
                            label="Perpose"
                            onChange={(v) => setPerpose(v.target.value)}
                            multiline
                            rows={3}
                            defaultValue={perpose}
                        />
                        <TextField
                            id="application_route"
                            label="Application Route"
                            onChange={(v) => setApplicationRoute(v.target.value)}
                            multiline
                            rows={3}
                            defaultValue={applicationRoute}
                        />
                    </div>
                    <div>
                        <TextField
                            id="etc"
                            label="etc"
                            onChange={(v) => setEtc(v.target.value)}
                            multiline
                            rows={3}
                            defaultValue={etc}
                        />
                        <TextField
                            id="history"
                            label="history Route"
                            onChange={(v) => setHistory(v.target.value)}
                            multiline
                            rows={3}
                            defaultValue={history}
                        />
                    </div>
                    <div>
                        <TextField
                            id="privateInfo"
                            label="Private Info"
                            onChange={(v) => setPrivateInfo(v.target.value)}
                            defaultValue={privateInfo}
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