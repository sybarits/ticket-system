import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import {utils as XLSXUtils, writeFileXLSX  as writeFileXLSX } from 'xlsx';

import Var from "../Var.js";
import AuthInfo from "../auth/AuthInfo.js";

function NewResearchersTable() {
    
    const [researcher, setResearcher] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [filteredData, setFilteredData] = useState([]);
    const nevigate = useNavigate();

    const BtnCellRenderer = (e) => {
        return (
            <Link to={"/new_researcher/" + e.data._id}
                key={e.data._id}
                style={{ color: "gray", textDecoration: "none" }}
                activestyle={{ color: "black" }}>
                <div> Open </div>
            </Link>
        )
    }

    const columnDefs = [
        {
            headerName: '차수',
            field: 'application_number'
        },
        {
            headerName: 'Status',
            field: 'status',
            width: 130
        },
        {
            headerName: 'Type',
            field: 'type',
            width: 130,
        },
        {
            headerName: 'Name',
            field: 'name_ko',
            width: 130,
        },
        {
            headerName: 'Email',
            field: 'email',
            flex: 2
        },
        {
            headerName: '연수기관',
            field: 'training_institution',
            width: 130
        },
        {
            headerName: '신청일',
            field: 'application_date',
            width: 130,
        },
        {
            headerName: 'Start',
            field: 'training_start_date',
            width: 130,
        },
        {
            headerName: 'End',
            field: 'training_end_date',
            width: 130,
        },
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
            .get(Var.getServiceUrl() + "/newresearcher/all", AuthInfo.getAxiosConfig())
            .then(({ data }) => {
                updateData(data);
                setResearcher(data);
                setRowCount(data.length);
                setFilteredData(data);
            });
    };

    const saveJsonAsExelFile = (j) => {
        const ws = XLSXUtils.json_to_sheet(j);
        const wb = XLSXUtils.book_new();
        XLSXUtils.book_append_sheet(wb, ws, "Sheet1");
        writeFileXLSX(wb, "data.xlsx");
    }

    const hendleSaveAsExelButton = () => {
        saveJsonAsExelFile(filteredData);
    }

    const hendleAddNewResearcherButton = () => {
        nevigate('/new_researcher_input');
    }

    const onFilterChanged = (e) => {
        setRowCount(e.api.getModel().rowsToDisplay.length);
        let data = []
        e.api.forEachNodeAfterFilter(node => {
            data.push(node.data);
        });
        setFilteredData(data);
    }

    return (
        <div style={{ width: '100%', height: 600, margin: '0 0 0 0' }}>
            {/* <h2>Cloud User Statistics</h2> */}
            {/* <CloudUserChart /> */}
            <h2>New Researcher Table</h2>
            <Stack spacing={2} direction="row" justifyContent="end" sx={{ m: 1 }}>
                <Button variant="outlined" onClick={Var.refreshPage}>Refresh</Button>
                <Button variant="outlined" onClick={hendleAddNewResearcherButton}>Add Researcher</Button>
                <Button variant="outlined" onClick={hendleSaveAsExelButton}>Save As Exel</Button>
            </Stack>
            <div align="left" >Total: {rowCount}</div>
            <div className="ag-theme-alpine" style={{ width: '100%', height: 800, margin: '0 0 0 0' }}>
                <AgGridReact
                    rowData={researcher}
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

NewResearchersTable.displayName = "NewResearchersTable";
export default NewResearchersTable;