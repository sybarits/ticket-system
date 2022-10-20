import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';

import Config from '../config.js';
import CloudUserChart from "../statistics/CloudUserChart.js";

function CloudUsers() {

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
        { headerName: 'Cloud Type', field: 'cloud_service' },
        { headerName: 'Name', field: 'name_ko' },
        { headerName: 'Name', field: 'name_us' },
        { headerName: 'Email', field: 'email' },
        { headerName: 'Create Time', field: 'create_date' },
        { headerName: 'Desc', field: 'desc' },
        {
            headerName: 'Action', field: 'create_time',
            filter: false,
            cellRenderer: BtnCellRenderer,
            cellRendererParams: {
                clicked: function (field) {
                    alert(`${field} was clicked`);

                },
            },
        },
    ]
    const [users, setUsers] = useState([]);
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
            .get(Config.getServiceUrl() + "/user/all")
            .then(({ data }) => {
                updateData(data);
                // setUsers(data);
            });
    };

    return (
        <div style={{ width: '100%', height: 600, margin: '0 0 0 0' }}>
            <h2>Cloud User Statistics</h2>
            <CloudUserChart />
            <h2>Cloud User Table</h2>
            <Stack spacing={2} direction="row" justifyContent="end" sx={{ m: 1 }}>
                <Button variant="outlined" href="/cloud_user_input">Add User</Button>
                <Button variant="outlined" onClick={refreshPage}>Refresh</Button>
            </Stack>
            <div className="ag-theme-alpine" style={{ width: '100%', height: 500, margin: '0 0 0 0' }}>
                <AgGridReact
                    rowData={users}
                    rowSelection={"multiple"}
                    suppressRowClickSelection={false}
                    columnDefs={columnDefs}
                    defaultColDef={{
                        editable: true,
                        sortable: true,
                        minWidth: 100,
                        filter: true,
                        resizable: true,
                        floatingFilter: true,
                        flex: 1,
                    }}
                    sideBar={{
                        toolPanels: ["columns", "filters"],
                        defaultToolPanel: "",
                    }}
                    onGridReady={onGridReady}
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