import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CloudUser from '../cloud_user/CloudUser.js';
import { Box, TextField, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import Config from '../config.js';

function Ticket() {

    const [disable, setDisable] = useState(false);
    const [id, setId] = useState("");
    const [ticketType, setTicketType] = useState("");
    const [createDate, setCreateDate] = useState("");
    const [lastModifyDate, setLastModifyDate] = useState("");
    const [status, setStatus] = useState("");
    const [saveObject, setSaveObject] = useState("");
    const [desc, setDesc] = useState("");
    const [history, setHistory] = useState("");

    const [userId, setUserId] = useState("");
    const [user, setUser] = useState("");
    const [ticket, setTicket] = useState({});

    const cloudUserRef = useRef();

    const params = useParams();

    const setTicketData = (data) => {
        // console.log("ticket data", data);
        setTicket(data);
        setId(data[0]._id);
        setTicketType(data[0].ticket_type);
        setCreateDate(data[0].create_date);
        setLastModifyDate(data[0].last_modify_date);
        setStatus(data[0].status);
        setSaveObject(data[0].save_object);
        setDesc(data[0].desc);
        setHistory(data[0].history);
        setUserId(data[0].user_id);
        setUser(data[0].user);
    }


    useEffect(() => {
        axios
            .get(Config.getServiceUrl() + "/ticket/" + params.ticketId)
            .then(({ data }) => setTicketData(data));
    }, []);

    const updateData = (data) => {
        axios
            .patch(Config.getServiceUrl() + "/ticket", { "ticketList": data })
            .then(({ data }) => {
                Config.resultData(data);
                setDisable(false);
            });
    };

    const deleteData = (data) => {
        axios
            .delete(Config.getServiceUrl() + "/ticket?deleteIdList=" + data)
            .then(({ data }) => {
                Config.resultData(data);
                Config.refreshPage();
                // setDisable(false);
            });
    };

    const handleDelete = (e) => {
        setDisable(true);
        deleteData(id)
    }

    const makeTicket = (e) => {
        const data = {};
        data._id = id;
        data.ticket_type = ticketType;
        data.create_date = createDate;
        data.last_modify_date = lastModifyDate;
        data.status = status;
        data.save_object = saveObject;
        data.desc = desc;
        data.history = history;
        data.user_id = userId;
        data.user = cloudUserRef.current.getUserData();
        console.log("data", data);
        return data;
    }

    const handleSaveChanges = (e) => {
        setDisable(true);
        const ticket = makeTicket();
        const list = [];
        list.push(ticket);
        updateData(list);
    }

    const handleTicketTypeChange = (e) => {
        setTicketType(e.target.value);
    }

    const handleStatusSelectChange = (e) => {
        setStatus(e.target.value);
    }

    return (
        <div style={{ width: '100%', height: 600, margin: '0 0 0 0' }}>
            <Stack spacing={2} direction="row" justifyContent="end" sx={{ m: 1 }} >
                <Button variant="outlined" onClick={handleSaveChanges} disabled={disable}>Save Changes</Button>
                <Button variant="outlined" onClick={Config.refreshPage}>Reset</Button>
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
                        value={createDate}
                    />
                    <TextField
                        id="last_modify_date"
                        label="Last Modify Date"
                        onChange={(v) => setLastModifyDate(v.target.value)}
                        value={lastModifyDate}
                    />
                </div>
                <div>
                    <TextField
                        id="save_objejct"
                        label="Save Objejct"
                        onChange={(v) => setSaveObject(v.target.value)}
                        value={saveObject}
                    />
                    <TextField
                        id="desc"
                        label="Desc"
                        onChange={(v) => setDesc(v.target.value)}
                        value={desc}
                    />
                    <TextField
                        id="history"
                        label="History"
                        onChange={(v) => setHistory(v.target.value)}
                        value={history}
                    />
                </div>

            </Box>
            {ticketType == "USER" && <CloudUser context={Config.Context().TicketInputs()} ref={cloudUserRef} user={[user]} />}
        </div>
    );

}

export default Ticket;