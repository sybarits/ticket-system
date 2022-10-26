import React, { useState, useEffect, forwardRef, useImperativeHandle  } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import Config from '../config.js';

const CloudUser = forwardRef((props, ref) => {
    const context = props.context;

    const [disable, setDisable] = useState(false);
    const [id, setId] = useState("");
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
    const [group, setGroup] = useState("");
    const [user, setUser] = useState([]);
    
    useState(props.user);
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


    const setUserData = (data) => {
        setId(data[0]._id);
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
        setGroup(data[0].group);
        setUser(data);
    };

    useEffect(() => {
        if (context == Config.Context().TicketInputs()) {
            setUserData(props.user);
            return;
        }
        axios
            .get(Config.getServiceUrl() + "/user/" + params.userId)
            .then(({ data }) => setUserData(data));
    }, []);

    const updateData = (data) => {
        axios
            .patch(Config.getServiceUrl() + "/user", { "userList": data })
            .then(({ data }) => {
                resultData(data);
                setDisable(false);
            });
    };

    const deleteData = (data) => {
        axios
            .delete(Config.getServiceUrl() + "/user?deleteIdList=" + data)
            .then(({ data }) => {
                resultData(data);
                refreshPage();
                // setDisable(false);
            });
    };

    const handleDelete = (e) => {
        setDisable(true);
        deleteData(id)
    }

    const makeUser = () => {
        const data = {};
        data._id = id;
        data.cloud_service = cloudService;
        data.name_ko = nameKo;
        data.name_us = nameUs;
        data.email = email;
        data.status = status;
        data.phone = phone;
        data.institution = institution;
        data.major = major;
        data.position = position;
        data.adviser = adviser;
        data.usage = usage;
        data.quota = quota;
        data.application_date = applicationDate;
        data.create_date = createDate;
        data.perpose = perpose;
        data.application_route = applicationRoute;
        data.etc = etc;
        data.history = history;
        data.private_info = privateInfo;
        data.group = group;
        return data;
    }

    useImperativeHandle(ref, () => ({
        getUserData(e) {
            return makeUser();
        }
    }))

    const handleSaveChanges = (e) => {
        setDisable(true);
        const user = makeUser();
        const list = [];
        list.push(user);
        updateData(list);
    }

    const handleCloudSelectChange = (e) => {
        setCloudService(e.target.value);
    }

    const handleStatusSelectChange = (e) => {
        setStatus(e.target.value);
    }


    if (user.length != 0 || context == Config.Context().TicketInputs()) {
        return (
            <div style={{ width: '100%', height: 600, margin: '0 0 0 0' }}>
                {context != Config.Context().TicketInputs() &&
                    <Stack spacing={2} direction="row" justifyContent="end" sx={{ m: 1 }}>
                        <Button variant="outlined" onClick={handleSaveChanges} disabled={disable}>Save Changes</Button>
                        <Button variant="outlined" onClick={refreshPage}>Reset</Button>
                        <Button variant="outlined" color="error" onClick={handleDelete} disabled={disable}>Delete</Button>
                    </Stack>
                }
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel id="status-select-label">Status</InputLabel>
                            <Select
                                labelId="status-select-label"
                                id="status-select"
                                value={status}
                                label="Status"
                                onChange={handleStatusSelectChange}
                            >
                                <MenuItem value={"APPLICATION"}>APPLICATION</MenuItem>
                                <MenuItem value={"INVITATIONSENT"}>INVITATION SENT</MenuItem>
                                <MenuItem value={"INVITATIONEXPIRED"}>INVITATION EXPIRED</MenuItem>
                                <MenuItem value={"ACTIVATE"}>ACTIVATE</MenuItem>
                                <MenuItem value={"DEACTIVATE"}>DEACTIVATE</MenuItem>
                                <MenuItem value={"REJECT"}>REJECT</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel id="cloud-servie-select-label">Cloud Service</InputLabel>
                            <Select
                                labelId="cloud-servie-select-label"
                                id="cloud-servie-select"
                                value={cloudService}
                                label="Cloud Service"
                                onChange={handleCloudSelectChange}
                            >
                                <MenuItem value={"IBMQ"}>IBMQ</MenuItem>
                                <MenuItem value={"IONQ"}>IonQ</MenuItem>
                                <MenuItem value={"DWAVE"}>D-wave</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            id="name_ko"
                            label="Name(KR)"
                            onChange={(v) => setNameKo(v.target.value)}
                            value={nameKo}
                        />
                        <TextField
                            id="name_us"
                            label="Name(EN)"
                            onChange={(v) => setNameUs(v.target.value)}
                            value={nameUs}
                        />
                    </div>
                    <div>
                        <TextField
                            id="email"
                            label="Email"
                            onChange={(v) => setEmail(v.target.value)}
                            value={email}
                        />

                        <TextField
                            id="Phone"
                            label="phone"
                            onChange={(v) => setPhone(v.target.value)}
                            value={phone}
                        />


                        <TextField
                            id="group"
                            label="Group"
                            onChange={(v) => setGroup(v.target.value)}
                            value={group}
                        />
                    </div>
                    <div>
                        <TextField
                            id="institution"
                            label="Institution"
                            onChange={(v) => setInstitution(v.target.value)}
                            value={institution}
                        />
                        <TextField
                            id="major"
                            label="Major"
                            onChange={(v) => setMajor(v.target.value)}
                            value={major}
                        />
                        <TextField
                            id="position"
                            label="Position"
                            onChange={(v) => setPosition(v.target.value)}
                            value={position}
                        />
                        <TextField
                            id="adviser"
                            label="Adviser"
                            onChange={(v) => setAdviser(v.target.value)}
                            value={adviser}
                        />
                    </div>
                    <div>
                        <TextField
                            id="usage"
                            label="Usage"
                            onChange={(v) => setUsage(v.target.value)}
                            value={usage}
                        />
                        <TextField
                            id="quota"
                            label="Quota"
                            onChange={(v) => setQuota(v.target.value)}
                            value={quota}
                        />
                        <TextField
                            id="application_date"
                            label="Application Date"
                            onChange={(v) => setApplicationDate(v.target.value)}
                            value={applicationDate}
                        />
                        <TextField
                            id="create_date"
                            label="Create Date"
                            onChange={(v) => setCreateDate(v.target.value)}
                            value={createDate}
                        />
                    </div>
                    <div>
                        <TextField
                            id="perpose"
                            label="Perpose"
                            onChange={(v) => setPerpose(v.target.value)}
                            multiline
                            rows={3}
                            value={perpose}
                        />
                        <TextField
                            id="application_route"
                            label="Application Route"
                            onChange={(v) => setApplicationRoute(v.target.value)}
                            multiline
                            rows={3}
                            value={applicationRoute}
                        />
                    </div>
                    <div>
                        <TextField
                            id="etc"
                            label="etc"
                            onChange={(v) => setEtc(v.target.value)}
                            multiline
                            rows={3}
                            value={etc}
                        />
                        <TextField
                            id="history"
                            label="History"
                            onChange={(v) => setHistory(v.target.value)}
                            multiline
                            rows={3}
                            value={history}
                        />
                    </div>
                    <div>
                        <TextField
                            id="privateInfo"
                            label="Private Info"
                            onChange={(v) => setPrivateInfo(v.target.value)}
                            value={privateInfo}
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
});

export default CloudUser;