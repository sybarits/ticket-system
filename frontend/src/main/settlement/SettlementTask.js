import { useState, useRef, useEffect } from "react";
import { Box, Stack, Button, Checkbox, FormControlLabel } from '@mui/material';
import { read as XLSXread, utils as XLSXutils, writeFileXLSX } from 'xlsx';

import Day from "../util/Day.js";
import Var from '../Var.js';

function SettlementTask() {

    const [disable, setDisable] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [header, setHeader] = useState([]);
    const [checkedHeader, setCheckedHeader] = useState([]);
    const [multiSheet, setMultiSheet] = useState(false);
    const fileInput = useRef(null);

    const handleInputChange = (e) => {
        const fileReader = new FileReader();
        const file = e.target.files[0];

        fileReader.onload = function (event) {
            let wb = XLSXread(fileReader.result, { type: 'binary', cellDates: true, dateNF: 'YYYY-MM-DD' });
            let rowObj = XLSXutils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            const headerRow = get_header_row(wb.Sheets[wb.SheetNames[0]])
            fill_blank_title(rowObj, headerRow);
            setRowData(rowObj);
            setHeader(headerRow);
        };
        fileReader.readAsBinaryString(file);
    }

    function fill_blank_title(data, header) {
        const dataLength = data.length;
        const headerLength = header.length;
        for (let i = 0; i < dataLength; i++) {
            for (let j=0; j<headerLength; j++) {
                if (header[j] != 'UNKNOWN 20' && data[i][header[j]] == undefined) {
                    data[i][header[j]] = data[i - 1][header[j]];
                }
            }
        }
    }

    function get_header_row(sheet) {
        var headers = [];
        var range = XLSXutils.decode_range(sheet['!ref']);
        var C, R = range.s.r; /* start in the first row */
        /* walk every column in the range */
        for (C = range.s.c; C <= range.e.c; ++C) {
            var cell = sheet[XLSXutils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
            var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
            if (cell && cell.t) hdr = XLSXutils.format_cell(cell);
            headers.push(hdr);
        }
        return headers;
    }

    const handleOnSubmit = () => {
        // setDisable(true);
        fileInput.current.click();
    }

    const handleCheckboxChange = (e) => {
        const index = checkedHeader.indexOf(e.target.name);
        let ch = checkedHeader;
        if (e.target.checked) {
            if (index == -1) {
                ch.push(e.target.name);
            }
        } else {
            if (index != -1) {
                ch.splice(index, 1);
            }
        }
        setCheckedHeader(ch);
    }

    const handleShowData = () => {

    }

    const HandleDownload = () => {
        const data = [];
        const rowLength = rowData.length;
        const checkedHeaderLength = checkedHeader.length;
        for (let i=0; i<rowLength; i++) {
            data.push({});
            for (let j=0; j<checkedHeaderLength; j++) {
                data[i][checkedHeader[j]]  = rowData[i][checkedHeader[j]];
            }
        }
        if (multiSheet) {
            const sheetNames = Day.makeMonthSheetNames(rowData);
            saveJsonAsMultiSheetExelFile(rowData, data, sheetNames);
        } else {
            saveJsonAsExelFile(data);
        }
    }

    const saveJsonAsExelFile = (j) => {
        const ws = XLSXutils.json_to_sheet(j);
        const wb = XLSXutils.book_new();
        XLSXutils.book_append_sheet(wb, ws, "Sheet1");
        writeFileXLSX(wb, "data.xlsx");
    }

    const saveJsonAsMultiSheetExelFile = (origin ,filltered, sheetNames) => {
        const wb = XLSXutils.book_new();
        const sheetLength = sheetNames.length;
        const jLength = origin.length;

        for (let i=0; i<sheetLength; i++) {
            let tempJson = [];
            for (let j=0; j<jLength; j++) {
                if (origin[j]["승인일자"] == undefined || origin[j]["승인일자"] == null || origin[j]["승인일자"] == '') continue;
                let date = (new Date(origin[j]["승인일자"].getTime() - 9 * 60 * 60 * 1000)).toISOString();
                let YearMonth = date.substring(0, 4) + date.substring(5, 7);
                if (sheetNames[i] == YearMonth) {
                    tempJson.push(filltered[j]);
                }
            }
            let ws = XLSXutils.json_to_sheet(tempJson);
            XLSXutils.book_append_sheet(wb, ws, sheetNames[i]);
        }
        writeFileXLSX(wb, "data.xlsx");
    }

    const handleMultiSheetCheckboxChange = (e) => {
        setMultiSheet(e.target.checked);
    }

    useEffect(() => {
    }, [header, rowData]);

    return (
        <div style={{ position: "absolute", width: '70%', top: 50, margin: '0 0 0 0' }}>

            <Stack spacing={2} direction="row" justifyContent="end" sx={{ m: 1 }} >
                <Button variant="outlined" onClick={Var.refreshPage}>Reset</Button>
            </Stack>
            <Stack spacing={2} direction="row" justifyContent="center" sx={{ m: 1 }} >
                <input type="file" accept={".xlsx"} ref={fileInput} onChange={handleInputChange} style={{ display: "none" }} />
                <Button onClick={(e) => { handleOnSubmit(e); }} variant="outlined" disabled={disable}>Open File</Button>
            </Stack>

            {header.length != 0 &&
            <div>
            <h3>Choose Columns</h3>
            <Box sx={{ alignItems: 'flex-start' }}>
                {header.map((h, index) => {
                    return (
                        <FormControlLabel
                            control={
                                <Checkbox key={index} name={h} onChange={handleCheckboxChange} />
                            }
                            label={h} key={index}
                        />
                    );
                })}
            </Box>
            <hr/>
            <Stack spacing={2} direction="row" justifyContent="center" sx={{ m: 1 }} >
                <Button variant="outlined" onClick={handleShowData}>show data</Button>
                <Button variant="outlined" onClick={HandleDownload}>download xlsx</Button>
                <FormControlLabel
                    control={
                        <Checkbox key="multi-sheet" name="multi-sheet" onChange={handleMultiSheetCheckboxChange} />
                    }
                    label="월별 sheet 구분"
                />
            </Stack>
            </div>}
        </div>
    )
}

export default SettlementTask;
