import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { Box, TextField, Stack, Button } from '@mui/material';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from 'axios';
import styled from "styled-components";

import Var from "../Var.js";
import AuthInfo from "../auth/AuthInfo.js";

function TrainingHistory(props) {

    const [history, setHistory] = useState([]);
    const [id, setId] = useState("");
    const [applicationNumber, setApplicationNumber] = useState("");
    const [applicationDate, setApplicationDate] = useState("");
    const [trainingStartDate, setTrainingStartDate] = useState("");
    const [trainingEndDate, setTrainingEndDate] = useState("");
    const [trainingMonths, setTrainingMonths] = useState("");
    const [trainingDays, setTrainingDays] = useState("");
    const [tableAPI, setTableAPI] = useState("");

    const researcherId = props.researcherId;

    const columnDefs = [
        {
            headerName: '신청차수',
            field: 'application_number'
        },
        {
            headerName: '신청일',
            field: 'application_date',
            // width: 130,
        },
        {
            headerName: 'Start',
            field: 'training_start_date',
            // width: 130,
        },
        {
            headerName: 'End',
            field: 'training_end_date',
            // width: 130,
        },
        {
            headerName: 'Months',
            field: 'training_months',
            // width: 130,
        },
        {
            headerName: 'Days',
            field: 'training_days',
            // width: 130,
        },

    ]

    useEffect(() => {
        // axios
        //   .get("http://192.168.137.86:8080/ticket/all")
        //   .then(({data}) => setTickets(data));
    }, history);

    const getHistoryData = () => {
        const updateData = (data) => {
            tableAPI.setRowData(data)
        };
        axios
            .get(Var.getServiceUrl() + "/traininghistory?researcherId=" + researcherId, AuthInfo.getAxiosConfig())
            .then(({ data }) => {
                updateData(data);
                setHistory(data);
            });
    }

    const onGridReady = (params) => {
        setTableAPI(params.api);
        const updateData = (data) => {
            params.api.setRowData(data)
        };
        axios
            .get(Var.getServiceUrl() + "/traininghistory?researcherId=" + researcherId, AuthInfo.getAxiosConfig())
            .then(({ data }) => {
                updateData(data);
                setHistory(data);
            });
    };

    const handleAddHistory = () => {
        const data = [{}];
        data[0].researcher_id = researcherId;
        data[0].application_number = applicationNumber;
        data[0].application_date = applicationDate;//this will be ISO format - new Date() -> toISOString()
        data[0].training_start_date = trainingStartDate;
        data[0].training_end_date = trainingEndDate;
        data[0].training_months = trainingMonths;
        data[0].training_days = trainingDays;
        uploadData(data);
    }

    const uploadData = (data) => {
        axios
            .put(Var.getServiceUrl() + "/traininghistory", { "trainingHistoryList": data }, AuthInfo.getAxiosConfig())
            .then(({ data }) => {
                Var.resultData(data);
                getHistoryData();
            });
    };

    return (
        <div style={{ width: '100%', height: 600, margin: '0 0 0 0' }}>
            <h2>Training History</h2>
            <div className="ag-theme-alpine" style={{ width: '100%', height: 300, margin: '0 0 0 0' }}>
                <AgGridReact
                    rowData={history}
                    rowSelection={"multiple"}
                    suppressRowClickSelection={false}
                    columnDefs={columnDefs}
                    defaultColDef={{
                        editable: true,
                        sortable: true,
                        minWidth: 80,
                        // maxWidth: 310,
                        filter: true,
                        resizable: true,
                        floatingFilter: true,
                        // flex: 2,
                    }}
                    sideBar={{
                        toolPanels: ["columns", "filters"],
                        defaultToolPanel: "",
                    }}
                    onGridReady={onGridReady}
                // onFilterChanged={onFilterChanged}
                // onSelectionChanged={onSelectionChanged}
                // onCellEditingStopped={(e) => {
                //     onCellValueChanged(e);
                // }}
                />
            </div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: 180 },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        id="institution"
                        label="application_number"
                        onChange={(v) => setApplicationNumber(v.target.value)}
                        placeholder="YYYY-#"
                        defaultValue={""}
                    />
                    <TextField
                        id="major"
                        label="application_date"
                        onChange={(v) => setApplicationDate(v.target.value)}
                        placeholder="YYYY-MM-DD"
                        defaultValue={""}
                    />
                    <TextField
                        id="position"
                        label="training_start_date"
                        onChange={(v) => setTrainingStartDate(v.target.value)}
                        placeholder="YYYY-MM-DD"
                        defaultValue={""}
                    />
                    <TextField
                        id="adviser"
                        label="training_end_date"
                        onChange={(v) => setTrainingEndDate(v.target.value)}
                        placeholder="YYYY-MM-DD"
                        defaultValue={""}
                    />
                    <TextField
                        id="adviser"
                        label="training_months"
                        onChange={(v) => setTrainingMonths(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="adviser"
                        label="training_days"
                        onChange={(v) => setTrainingDays(v.target.value)}
                        defaultValue={""}
                    />
                </div>

            </Box>
            <Stack spacing={2} direction="row" justifyContent="end" sx={{ m: 1 }}>
                <Button variant="outlined" onClick={handleAddHistory}>Add History</Button>
                <Button variant="outlined" onClick={Var.refreshPage}>Refresh</Button>
            </Stack>
        </div>
    );
}

export default TrainingHistory;