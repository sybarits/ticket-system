import React, { useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CloudUser from '../cloud_user/CloudUser.js';
import { Box, TextField, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import Var from '../Var.js';
import CloudUserInputs from "../cloud_user/CloudUserInputs.js";
import AuthInfo from "../auth/AuthInfo.js";

function TicketInputs(props) {

    const [disable, setDisable] = useState(false);
    const [id, setId] = useState("");
    const [ticketType, setTicketType] = useState("");
    const [createDate, setCreateDate] = useState("");
    const [lastmodifyDate, setLastModifyDate] = useState("");
    const [status, setStatus] = useState("");
    const [saveObject, setSaveObject] = useState("");
    const [desc, setDesc] = useState("");
    const [history, setHistory] = useState("");

    const [userId, setUserId] = useState("");
    const [user, setUser] = useState("");

    const cloudUserInputsRef = useRef();

    const resultData = (data) => {
        console.log("complete upload data", data);
    };

    const handleSaveObjectChange = (e) => {
        setSaveObject(e.target.value);
    }

    const handleTicketTypeChange = (e) => {
        setTicketType(e.target.value);
    }

    const handleStatusSelectChange = (e) => {
        setStatus(e.target.value);
    }

    const uploadData = (data) => {
        axios
            .put(Var.getServiceUrl() + "/ticket", { "ticketList": data }, AuthInfo.getAxiosConfig())
            .then(({ data }) => {
                resultData(data);
                setDisable(false);
            });
    };

    const handleSaveNewTicket = (e) => {
        setDisable(true);

        // console.log("e", e);
        const data = [{}];
        data[0].ticket_type = ticketType;
        data[0].create_date = createDate;
        data[0].last_modify_date = lastmodifyDate;
        data[0].status = status;
        data[0].save_object = saveObject;
        data[0].desc = desc;
        data[0].history = history;
        data[0].user_id = userId;
        data[0].user = cloudUserInputsRef.current.getUserData();
        uploadData(data);
    }

    // const [ticket, setTicket] = useState([]);
    // const body = {"query_string": params.ticketId}
    // useEffect(() => {
    //     axios
    //       .get(Var.getServiceUrl()+"ticket/"+params.ticketId)
    //       .then(({data}) => setTicket(data));
    // }, []);

    return (
        <div style={{ width: '100%', height: 600, margin: '0 0 0 0' }}>
            <Stack spacing={2} direction="row" justifyContent="end" sx={{ m: 1 }} >
                <Button variant="outlined" onClick={handleSaveNewTicket} disabled={disable}>Save New Ticket</Button>
                <Button variant="outlined" onClick={Var.refreshPage}>Reset</Button>
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
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="status-select-label">Status</InputLabel>
                        <Select
                            labelId="status-select-label"
                            id="status-select"
                            value={status}
                            label="Status"
                            onChange={handleStatusSelectChange}
                        >
                            <MenuItem value={"OPEN"}>OPEN</MenuItem>
                            <MenuItem value={"PAUSE"}>PAUSE</MenuItem>
                            <MenuItem value={"PROCESS"}>PROCESS</MenuItem>
                            <MenuItem value={"RETURN"}>RETURN</MenuItem>
                            <MenuItem value={"CLOSE"}>CLOSE</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="ticket-type-select-label">Ticket Type</InputLabel>
                        <Select
                            labelId="ticket-type-select-label"
                            id="ticket-type-select"
                            value={ticketType}
                            label="Ticket Type"
                            onChange={handleTicketTypeChange}
                        >
                            <MenuItem value={"USER"}>USER</MenuItem>
                            <MenuItem value={"FORM"}>FORM</MenuItem>
                            <MenuItem value={"LECTURE"}>LECTURE</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        id="create_date"
                        label="Create Date"
                        onChange={(v) => setCreateDate(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="last_modify_date"
                        label="Last Modify Date"
                        onChange={(v) => setLastModifyDate(v.target.value)}
                        defaultValue={""}
                    />
                </div>
                <div>
                    <TextField
                        id="desc"
                        label="Desc"
                        multiline
                        rows={3}
                        onChange={(v) => setDesc(v.target.value)}
                        defaultValue={""}
                        sx={{ width: 260 }}
                    />
                    <TextField
                        id="history"
                        label="History"
                        multiline
                        rows={3}
                        onChange={(v) => setHistory(v.target.value)}
                        defaultValue={""}
                        sx={{ width: 660 }}
                    />
                </div>
                <div>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="save_objejct-select-label">Save Object</InputLabel>
                        <Select
                            labelId="save_objejct-select-label"
                            id="save_objejct-select"
                            value={saveObject}
                            label="Save Object"
                            onChange={handleSaveObjectChange}
                        >
                            <MenuItem value={"true"}>TRUE</MenuItem>
                            <MenuItem value={"false"}>FALSE</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </Box>
            <hr />
            {ticketType == "USER" && <CloudUserInputs context={Var.Context().TicketInputs()} ref={cloudUserInputsRef} />}
        </div>
    );
}

TicketInputs.displayName = "TicketInputs";
export default TicketInputs;