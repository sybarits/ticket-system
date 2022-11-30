import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';

import Var from '../Var.js';
import AuthInfo from "../auth/AuthInfo.js";


function Tickets() {
    
    const [tickets, setTickets] = useState([]);
    const nevigate = useNavigate();

    const BtnCellRenderer = (e) => {
        return (
            // <button onClick={(params) => btnClickedHandler(params, e)}>Edit</button>
            <Link to={"/ticket/" + e.data._id}
                key={e.data._id}
                style={{ color: "gray", textDecoration: "none" }}
                activestyle={{ color: "black" }}>
                <div> Open </div>
            </Link>
        )
    }
    
    const columnDefs = [
        { headerName: 'Status', field: 'status' },
        { headerName: 'Ticket Type', field: 'ticket_type' },
        { headerName: 'Create Time', field: 'create_date', sort: "desc" },
        { headerName: 'Last Modify Date', field: 'last_modify_date' },
        { headerName: 'Desc', field: 'desc' },
        {
            headerName: 'Action', field: 'create_time',
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
        const updateData = (data) => params.api.setRowData(data);
        axios
            .get(Var.getServiceUrl() + "/ticket/all", AuthInfo.getAxiosConfig())
            .then(({ data }) => updateData(data));
    };

    const hendleAddTicketButton = () => {
        nevigate('/ticket_input');
    }

    return (
        <div style={{ width: '100%', height: 600, margin: '0 0 0 0' }}>
            <h2>Tickets</h2>
            <Stack spacing={2} direction="row" justifyContent="end" sx={{ m: 1 }}>
                {/* <Button variant="outlined">Upload csv</Button> */}
                <Button variant="outlined" onClick={hendleAddTicketButton}>Add Ticket</Button>
                <Button variant="outlined" onClick={Var.refreshPage}>Refresh</Button>
            </Stack>
            <div className="ag-theme-alpine" style={{ width: '100%', height: 500, margin: '0 0 0 0' }}>
                <AgGridReact
                    rowData={tickets}
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

Tickets.displayName = "Tickets";
export default Tickets;