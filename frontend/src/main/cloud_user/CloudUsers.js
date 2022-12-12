import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import { read as XLSXread, utils as XLSXutils, writeFileXLSX } from 'xlsx';

import Var from "../Var.js";
import AuthInfo from "../auth/AuthInfo.js";

function CloudUsers() {

    const [users, setUsers] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [filteredData, setFilteredData] = useState([]);
    const nevigate = useNavigate();
    const fileInput = useRef(null);
    const [powerUserData, setPoserUserData] = useState([]);

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
                setFilteredData(data);
            });
    };

    const saveJsonAsExelFile = (j) => {
        const ws = XLSXutils.json_to_sheet(j);
        const wb = XLSXutils.book_new();
        XLSXutils.book_append_sheet(wb, ws, "Sheet1");
        writeFileXLSX(wb, "data.xlsx");
    }

    const handlePowerUserButton = () => {
        fileInput.current.click();
    }
    const handleInputChange = (e) => {
        readUserListFile(e);
    }
    const readUserListFile = (e) => {
        const fileReader = new FileReader();
        const file = e.target.files[0];

        fileReader.onload = async function (event) {
            let wb = XLSXread(fileReader.result, { type: 'binary', cellDates: true, dateNF: 'YYYY-MM-DD' });
            let rowObj = XLSXutils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            for (let i = 0; i < rowObj.length; i++) {
                await getIBMQUserDataAndSet(rowObj[i]);
            }
            saveJsonAsExelFile(rowObj);
        };
        fileReader.readAsBinaryString(file);
    }

    const getIBMQUserDataAndSet = async(u) => {
        await axios
            .get(Var.getServiceUrl() + "/user?query_string="+u.User, AuthInfo.getAxiosConfig())
            .then(({ data }) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].cloud_service == "IBMQ") {
                        for(let k of Object.keys(data[i])) {
                            u[k] = data[i][k];
                        }
                    }
                }
            });
    }

    const handleSaveAsExelButton = () => {
        saveJsonAsExelFile(filteredData);
    }

    const handleAddUserButton = () => {
        nevigate('/cloud_user_input');
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
            <h2>Cloud User Table</h2>
            <Stack spacing={2} direction="row" justifyContent="end" sx={{ m: 1 }}>
                <Button variant="outlined" onClick={refreshPage}>Refresh</Button>
                <Button variant="outlined" onClick={handleAddUserButton}>Add User</Button>
                <Button variant="outlined" onClick={handleSaveAsExelButton}>Save As Exel</Button>
                <Button variant="outlined" onClick={handlePowerUserButton}>Power User List</Button>
            </Stack>
            <Stack spacing={2} direction="row" justifyContent="center" sx={{ m: 1 }} >
                <input type="file" accept={".xlsx"} ref={fileInput} onChange={handleInputChange} style={{ display: "none" }} />
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

CloudUsers.displayName = "CloudUsers";
export default CloudUsers;