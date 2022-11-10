import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import styled from "styled-components";

import Var from "../Var.js";
import CloudUserChart from "../statistics/CloudUserChart.js";
import AuthInfo from "../auth/AuthInfo.js";

function CloudUsers() {

    const [users, setUsers] = useState([]);
    const [rowCount, setRowCount] = useState(0);

    const BtnCellRenderer = (e) => {
        return (
            <Link to={"/cloud_user/" + e.data._id}
                key={e.data._id}
                style={{ color: "gray", textDecoration: "none" }}
                activestyle={{ color: "black" }}>
                <div> Open </div>
            </Link>
        )
    }

    const refreshPage = (e) => {
        window.location.reload(false);
    }

    const columnDefs = [
        {
            headerName: 'Cloud Type', field: 'cloud_service',
            width: 130,
        },
        {
            headerName: 'Status', field: 'status',
            width: 130
        },
        {
            headerName: 'Name', field: 'name_ko',
            width: 130,
        },
        {
            headerName: 'Name', field: 'name_us',
            width: 130
        },
        { headerName: 'Email', field: 'email', flex: 2 },
        { headerName: 'Application Date', field: 'application_date' },
        { headerName: 'Create Date', field: 'create_date' },
        // { headerName: 'Desc', field: 'desc' },
        {
            headerName: 'Action', field: 'create_time',
            filter: false,
            width: 80,
            cellRenderer: BtnCellRenderer,
            cellRendererParams: {
                clicked: function (field) {
                    alert(`${field} was clicked`);

                },
            },
        },
    ]

    useEffect(() => {
        // axios
        //   .get("http://192.168.137.86:8080/ticket/all")
        //   .then(({data}) => setTickets(data));
    }, []);

    const onGridReady = (params) => {
        const updateData = (data) => {
            // console.log("row data",data);
            params.api.setRowData(data)
        };
        axios
            .get(Var.getServiceUrl() + "/user/all", AuthInfo.getAxiosConfig())
            .then(({ data }) => {
                updateData(data);
                setUsers(data);
                setRowCount(data.length);
            });
    };


    const onFilterChanged = (e) => {
        setRowCount(e.api.getModel().rowsToDisplay.length);
    }

    return (
        <div style={{ width: '100%', height: 600, margin: '0 0 0 0' }}>
            {/* <h2>Cloud User Statistics</h2> */}
            {/* <CloudUserChart /> */}
            <h2>Cloud User Table</h2>
            <Stack spacing={2} direction="row" justifyContent="end" sx={{ m: 1 }}>
                <Button variant="outlined" href="/cloud_user_input">Add User</Button>
                <Button variant="outlined" onClick={refreshPage}>Refresh</Button>
            </Stack>
            <div align="left" >Total: {rowCount}</div>
            <div className="ag-theme-alpine" style={{ width: '100%', height: 800, margin: '0 0 0 0' }}>
                <AgGridReact
                    rowData={users}
                    rowSelection={"multiple"}
                    suppressRowClickSelection={false}
                    columnDefs={columnDefs}
                    defaultColDef={{
                        editable: true,
                        sortable: true,
                        minWidth: 80,
                        maxWidth: 310,
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
                    onFilterChanged={onFilterChanged}
                // onSelectionChanged={onSelectionChanged}
                // onCellEditingStopped={(e) => {
                //     onCellValueChanged(e);
                // }}
                />
            </div>
        </div>
    );
}

export default CloudUsers;